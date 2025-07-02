# CV Screen

CV Screen is a production-ready, TypeScript-based REST API that leverages AI and NLP to extract, structure, and match information from candidate CVs and job descriptions (JDs). It provides endpoints for uploading documents, extracting structured data, and predicting the suitability of candidates for job roles using advanced embedding and similarity techniques.

## 🚀 Features
- **CV & JD Extraction:** Uses LLMs to extract structured data from unstructured PDF CVs and job descriptions.
- **AI-Powered Matching:** Computes similarity scores between CVs and JDs using transformer-based embeddings.
- **Authentication & User Management:** Secure user registration, login, and profile management.
- **File Uploads:** Secure, validated PDF uploads for CVs and JDs.
- **Robust API:** RESTful endpoints for all major operations, with clear error handling and validation.
- **Dockerized:** Easy deployment for both development and production.

## 🛠️ Technologies Used
- **Node.js** & **Express** (REST API framework)
- **TypeScript** (type safety)
- **MongoDB** (data storage)
- **Mongoose** (ODM)
- **@xenova/transformers** (embeddings for similarity)
- **Ollama** (LLM for extraction)
- **Jest** (testing)
- **Multer** (file uploads)
- **Docker** & **docker-compose** (containerization)
- **Stripe** (payment integration)
- **Helmet, CORS, Rate Limiting** (security)

## 📦 Project Structure
- `src/modules/` — Feature modules (CV, JD, prediction, upload, user)
- `src/shared/` — Shared configs, middlewares, services, utils
- `src/uploads/` — Uploaded PDF files

## 📑 API Endpoints
All endpoints are prefixed with `/api/v1`.

### Auth & User
- `POST   /user/create` — Register a new user
- `POST   /user/login` — Login and receive JWT
- `PUT    /user/update` — Update user profile (auth required)
- `GET    /user/:id` — Get user by ID (auth required)
- `GET    /user/payment` — Create payment intent (Stripe)

### File Upload
- `POST   /upload/` — Upload one or more PDF files (field: `file`)

### Prediction
- `POST   /prediction/` — Predict suitability for a single CV & JD
- `POST   /prediction/multi` — Predict for multiple CVs (auth required)

### Health
- `GET    /health` — Health check

## 🏗️ Setup & Running

### 1. Clone & Install
```bash
git clone <repo-url>
cd CV-Screen
npm install
```

### 2. Environment Variables
Create a `.env.dev` (for dev) or `.env.prod` (for prod) in the root with:
```
PORT=4000
NODE_ENV=development
DATABASE_URL=mongodb://<user>:<pass>@<host>:<port>/<db>
JWT_SECRET=your_jwt_secret
LOG_LEVEL=info
STRIPE_SECRET_KEY=your_stripe_key
PRO_CHARGE=100 # or your price
```

### 3. Local Development
```bash
npm run dev
```

### 4. With Docker (Recommended)
#### Development
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up --build
```
#### Production
```bash
docker-compose --env-file .env.prod up --build
```

The API will be available at `http://localhost:4000/api/v1`.

## 📂 Uploads
- Only PDF files are accepted (max 5MB each).
- Uploaded files are stored in `src/uploads/`.

## 🧠 How It Works
- **Extraction:** LLM (via Ollama) parses PDFs to extract structured candidate/job data.
- **Embedding:** Text is embedded using `@xenova/transformers` (MiniLM-L6-v2).
- **Matching:** Cosine similarity is computed between CV and JD embeddings for overall, technical, education, and work experience fit.

## 🧪 Testing
```bash
npm test
```

## 🛡️ Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` for all required variables.
- For LLM extraction, Ollama must be running and accessible at the configured URL.
- Only PDF files are supported for upload.



---
**Author:** Shamal Rathnayake
