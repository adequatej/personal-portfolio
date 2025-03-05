#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons/tech

# Function to download SVG if it doesn't exist
download_svg() {
    local name=$1
    local url=$2
    local output="public/icons/tech/${name}.svg"
    
    if [ ! -f "$output" ]; then
        echo "Downloading ${name}.svg..."
        curl -s "$url" -o "$output"
    else
        echo "${name}.svg already exists"
    fi
}

# Download missing icons
download_svg "html" "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
download_svg "css" "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
download_svg "javascript" "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
download_svg "framer" "https://raw.githubusercontent.com/devicons/devicon/master/icons/framermotion/framermotion-original.svg"
download_svg "bootstrap" "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg"
download_svg "flask" "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg"
download_svg "fastapi" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/fastapi.svg"
download_svg "sqlalchemy" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/sqlalchemy.svg"
download_svg "sqlite" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/sqlite.svg"
download_svg "sql" "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
download_svg "pytorch" "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg"
download_svg "tensorflow" "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg"
download_svg "scikit" "https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.svg"
download_svg "pandas" "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg"
download_svg "opencv" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/opencv.svg"
download_svg "azure" "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg"
download_svg "gcp" "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg"
download_svg "linux" "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg"
download_svg "bash" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/gnubash.svg"
download_svg "prometheus" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/prometheus.svg"
download_svg "aws" "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg"

# New icons
download_svg "shadcn" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/shadcnui.svg"
download_svg "streamlit" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/streamlit.svg"
download_svg "firebase" "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg"
download_svg "vercel" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/vercel.svg"
download_svg "transformers" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/huggingface.svg"
download_svg "stablediffusion" "https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/stability-ai.svg"

# Create a simple SVG for Gradio
cat > public/icons/tech/gradio.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold" font-size="16" fill="currentColor">
    Gradio
  </text>
</svg>
EOL

echo "All icons downloaded successfully!" 