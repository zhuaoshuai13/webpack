# Infinix

# System requirements

- `node >= 16`
- `npm >= `

# How to development a project?

- Switch to the project root directory

```bash
cd <project_root_directory>
```

- Install dependencies

```bash
npm i
```

If you want to create a new product

```bash
npm run creat --filename=<newProductname>
```

```bash
npm run start
```

If you want to maintain the previous product

```bash
npm run change --filename=<oldProductname>
```

```bash
npm run start
```

# How to deploy a project?

If you want to publish on the test machine

```bash
npm run test-build
```

If you want to publish on the official plane

```bash
npm run build
```
