{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";

  outputs = inputs: let
    system = "x86_64-linux";
    pkgs = import inputs.nixpkgs { inherit system; };
  in {
    devShells.${system}.default =  pkgs.mkShell {
      packages = with pkgs; [
        git
        pnpm
        python3
        nodejs_24
        (writeShellScriptBin "setup" ''
          cd "$(git rev-parse --show-toplevel)"
          PROJECT_NAME=$(basename "$PWD")
          TODAY=$(date +%Y-%m-%d)

          if [ -f "wrangler.jsonc" ]; then
            sed -i "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" wrangler.jsonc
            sed -i "s/\"compatibility_date\": \".*\"/\"compatibility_date\": \"$TODAY\"/" wrangler.jsonc
            sed -i "s/\"database_name\": \".*\"/\"database_name\": \"''${PROJECT_NAME//-/_}_db\"/" wrangler.jsonc
            pnpm types
          fi

          if [ -f "package.json" ]; then
            sed -i "s/apply\( [^ ]*\)\? --local/apply ''${PROJECT_NAME//-/_}_db --local/" package.json
            pnpm db:generate && pnpm db:migrate
          fi
        '')
      ];
      shellHook = ''
        export SSL_CERT_FILE="${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
        export NIX_SSL_CERT_FILE="${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
      '';
    };
  };
}
