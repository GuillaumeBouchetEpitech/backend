
echo "\n\n#####\n\n"

curl "http://127.0.0.1:3000/postcodes/SE166RZ"

echo "\n#####"

curl "http://127.0.0.1:3000/postcodes/SE166RZ,SE166RZ,SE166RZ"

echo "\n#####"

curl "http://127.0.0.1:3000/weather/?latitude=51.500521&longitude=-0.044641"

echo "\n#####"

curl "http://127.0.0.1:3000/address/?latitude=51.500521&longitude=-0.044641"

echo "\n\n#####\n\n"
