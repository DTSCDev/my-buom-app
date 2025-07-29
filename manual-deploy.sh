#!/bin/bash
# Manual deployment script

echo "Building the application..."
npm run build

echo "Contents of dist folder:"
ls -la dist/

echo "Uploading via curl FTP..."
cd dist

# Upload each file individually
for file in *; do
    if [ -f "$file" ]; then
        echo "Uploading $file..."
        curl -T "$file" ftp://my-buom-app@sids.buom.app:$FTP_PASSWORD@ftp.buom.app/public_html/
    fi
done

# Upload assets folder if it exists
if [ -d "assets" ]; then
    echo "Uploading assets folder..."
    cd assets
    for asset in *; do
        if [ -f "$asset" ]; then
            echo "Uploading assets/$asset..."
            curl --ftp-create-dirs -T "$asset" ftp://my-buom-app@sids.buom.app:$FTP_PASSWORD@ftp.buom.app/public_html/assets/
        fi
    done
    cd ..
fi

echo "Deployment complete!"
