{
  description = "Talkcan static website";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = function:
        nixpkgs.lib.genAttrs supportedSystems (
          system: function (import nixpkgs { inherit system; })
        );
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShellNoCC {
          packages = [
            pkgs.bun
            pkgs.resvg
            (pkgs.python3.withPackages (python: [
              python.brotli
              python.fonttools
            ]))
          ];

          shellHook = ''
            expected_bun="1.3.13"
            actual_bun="$(bun --version)"
            if [ "$actual_bun" != "$expected_bun" ]; then
              echo "Expected Bun $expected_bun, got $actual_bun" >&2
              return 1
            fi
          '';
        };
      });

      checks = forAllSystems (pkgs: {
        bun-version = pkgs.runCommand "talkcan-bun-version" { } ''
          test "$(${pkgs.bun}/bin/bun --version)" = "1.3.13"
          touch "$out"
        '';
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt-tree);
    };
}
