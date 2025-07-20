# CV Screen

CV Screen is a production-ready, TypeScript-based REST API that leverages AI, NLP, and computer vision to extract, structure, and match information from candidate CVs and job descriptions (JDs). It provides endpoints for uploading documents, extracting structured data, predicting the suitability of candidates for job roles using advanced embedding and similarity techniques, and extracting profile images from CVs.

## 🚀 Features
- **CV & JD Extraction:** Uses LLMs to extract structured data from unstructured PDF CVs and job descriptions.
- **AI-Powered Matching:** Computes similarity scores between CVs and JDs using transformer-based embeddings.
- **AI-Powered Hire Prediction:** Predicts both the probability and binary decision of hiring a candidate using a trained machine learning model on CV and JD embeddings.
- **Profile Image Extraction:** Automatically extracts and detects profile images from CV PDFs using OpenCV and PyMuPDF, returning the image if a face is found.
- **Authentication & User Management:** Secure user registration, login, and profile management.
- **File Uploads:** Secure, validated PDF uploads for CVs and JDs.
- **Robust API:** RESTful endpoints for all major operations, with clear error handling and validation.
- **Dockerized:** Easy deployment for both development and production.
- **CI/CD Pipeline:** Automated testing, building, and deployment with GitHub Actions.

## 🛠️ Technologies Used
- **Node.js** & **Express** (REST API framework)
- **TypeScript** (type safety)
- **MongoDB** (data storage)
- **Mongoose** (ODM)
- **@xenova/transformers** (embeddings for similarity)
- **Ollama** (LLM for extraction)
- **Python** (Flask, scikit-learn, joblib, numpy, PyMuPDF, Pillow, OpenCV) — Model server and image extraction
- **Jest** and **Vitest** (testing)
- **Multer** (file uploads)
- **Docker** & **docker-compose** (containerization)
- **Stripe** (payment integration)
- **Helmet, CORS, Rate Limiting** (security)
- **GitHub Actions** (CI/CD)

## 📦 Project Structure
- `src/modules/` — Feature modules (CV, JD, prediction, upload, user)
- `src/shared/` — Shared configs, middlewares, services, utils
- `src/uploads/` — Uploaded PDF files
- `model-server/` — Python Flask app for AI model serving and image extraction
- `.github/workflows/` — CI/CD pipeline configurations

## 🔄 CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with GitHub Actions:

### Workflows
- **Pull Request Checks** (`pull-request.yml`): Runs on PRs to main/develop
  - Linting and code formatting
  - Unit tests with MongoDB service
  - Security audits
  - Build verification

- **Deploy** (`deploy.yml`): Runs on pushes to main/develop
  - Builds and pushes Docker images to GitHub Container Registry
  - Deploys to staging (develop branch)
  - Deploys to production (main branch)

- **Security** (`security.yml`): Runs on pushes, PRs, and weekly
  - npm audit checks
  - Snyk vulnerability scanning
  - Container vulnerability scanning with Trivy

- **Dependency Updates** (`dependency-updates.yml`): Runs weekly
  - Checks for outdated dependencies
  - Creates PRs for updates

### Setup
1. **Repository Secrets** (required):
   - `SNYK_TOKEN`: Your Snyk API token for security scanning

2. **Environment Protection** (recommended):
   - Create `staging` and `production` environments in GitHub
   - Add environment-specific secrets and protection rules

3. **Branch Protection** (recommended):
   - Require PR checks to pass before merging
   - Require up-to-date branches before merging

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
- `POST   /prediction/` — Predict suitability for a single CV & JD. 
  - `hireProbability` (float, 0-1): Probability of hire from AI model
  - `hireDecision` (0 or 1): Binary hire decision from AI model
  - `image` (base64 string): Extracted profile image from CV (if detected)
- `POST   /prediction/multi` — Predict for multiple CVs (auth required)

### Health
- `GET    /health` — Health check

#### Python Model Server (internal)
- `POST   /predict` — Receives embeddings, returns `hire_probability` and `hire_decision`
- `POST   /upload` — Receives a PDF, returns `profile_image_base64` if a face is detected

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
- **Hire Prediction:** The backend sends combined CV and JD embeddings to a Python model server, which returns the probability and decision for hiring.
- **Image Extraction:** Uploaded CV PDFs are processed to extract images; OpenCV detects faces, and the first detected face image is returned as a base64 string and stored with the CV data.

## 🧪 Testing
```bash
npm test
```

Vitest is used as the testing framework. You can also use the Vitest UI for interactive testing:

```bash
npx vitest --ui
```

## 🛡️ Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` for all required variables.
- For LLM extraction, Ollama must be running and accessible at the configured URL.
- For AI-powered hire prediction and image extraction, ensure the Python model server is running and accessible at the configured URL. All Python dependencies (Flask, scikit-learn, joblib, numpy, PyMuPDF, Pillow, OpenCV) must be installed.
- Only PDF files are supported for upload.

---

**Author:** Shamal Rathnayake
