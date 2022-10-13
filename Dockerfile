FROM denoland/deno
WORKDIR /app
COPY . ./
CMD ["run", "--allow-net", "main.ts"]