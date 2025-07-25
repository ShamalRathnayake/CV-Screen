# CV Screen: Project Explained in Simple Terms

---

## 1. Project Overview and Purpose

**CV Screen** is a web-based system that uses Artificial Intelligence (AI), Natural Language Processing (NLP), and Computer Vision to help companies automatically analyze and match candidate CVs (resumes) with job descriptions (JDs). It can:
- Extract structured information from unstructured PDF CVs and JDs
- Compare and score how well a candidate fits a job
- Predict the likelihood of hiring a candidate using a trained AI model
- Extract profile images from CVs
- Manage users and secure access

---

## 2. High-Level Architecture

Here's how the system is structured:

```mermaid
graph TD
  A[User (HR/Recruiter)] -->|Uploads CV/JD, Requests Prediction| B[Node.js API Server]
  B -->|Saves/Fetches Data| C[(MongoDB Database)]
  B -->|Sends Text to| D[LLM (Ollama)]
  B -->|Gets Embeddings from| E[Transformers Library]
  B -->|Sends Embeddings & Files to| F[Python Model Server]
  F -->|Returns Prediction/Image| B
  B -->|Returns Results| A
```

**Explanation:**
- The user interacts with the Node.js API (backend server).
- The backend stores data in MongoDB, uses LLMs to extract info, and transformer models to create embeddings (numerical representations of text).
- For predictions and image extraction, it communicates with a separate Python server running the AI model.

---

## 3. Tech Stack Explained

- **Node.js & Express:** JavaScript runtime and web framework for building the backend API.
- **TypeScript:** Adds type safety to JavaScript, making code more reliable.
- **MongoDB:** A NoSQL database for storing data like users, CVs, JDs, and predictions.
- **Mongoose:** A library to interact with MongoDB using schemas (data blueprints).
- **@xenova/transformers:** Library for generating text embeddings (turning text into numbers for AI).
- **Ollama:** A tool to run Large Language Models (LLMs) locally for extracting structured info from text.
- **Python (Flask, scikit-learn, joblib, numpy, PyMuPDF, Pillow, OpenCV):** Used for the model server that predicts hiring and extracts images from PDFs.
- **Multer:** Middleware for handling file uploads in Node.js.
- **Stripe:** For payment processing (e.g., pro account upgrades).
- **Docker & docker-compose:** For containerizing and running the app in any environment.
- **GitHub Actions:** For automated testing and deployment (CI/CD).
- **Helmet, CORS, Rate Limiting:** Security tools for the API.

---

## 4. Step-by-Step Feature Explanations

### 4.1 User Registration, Login, and Authentication
- **Registration:** User provides email, password, phone, designation, and location. The password is hashed (scrambled) for security before saving.
- **Login:** User provides email and password. The system checks the password and, if correct, gives back a JWT (JSON Web Token) for future requests.
- **Authentication:** Protected routes require the JWT. The server checks the token to verify the user's identity.

**Analogy:** Think of JWT as a digital ID card you show to access secure areas.

---

### 4.2 File Upload and Storage
- Users upload PDF files (CVs or JDs) via the API.
- The server checks the file type and size (only PDFs, max 5MB).
- Files are saved to a specific folder on the server.

---

### 4.3 CV and JD Extraction (with LLMs)
- The server reads the PDF and extracts the raw text.
- It sends the text to an LLM (Large Language Model) via Ollama, asking it to extract structured information (like name, skills, job title, etc.).
- The LLM returns the info in a structured format (like JSON).

**Analogy:** The LLM is like a super-smart assistant that reads messy documents and fills out neat forms for you.

---

### 4.4 Embedding and Similarity Calculation
- The extracted info is turned into embeddings (lists of numbers) using a transformer model.
- Embeddings are like unique fingerprints for text, allowing the system to compare how similar two pieces of text are.
- The system calculates cosine similarity (a measure of how close two vectors are) between the CV and JD embeddings for overall, technical, education, and work experience fit.

**Analogy:** Embeddings are like turning words into coordinates on a map, so you can measure how close two ideas are.

---

### 4.5 AI-Powered Hire Prediction (Python Model Server)
- The backend combines the embeddings from the CV and JD and sends them to the Python model server.
- The Python server loads a trained machine learning model (using scikit-learn) and predicts:
  - The probability of hiring (a number between 0 and 1)
  - A binary decision (hire or not)
- The backend returns these results to the user.

---

### 4.6 Profile Image Extraction from CVs
- The backend sends the uploaded PDF to the Python server.
- The Python server extracts images from the PDF and uses OpenCV to detect faces.
- If a face is found, it returns the image (as a base64 string) to the backend, which stores it with the CV data.

---

### 4.7 Data Storage (MongoDB Schemas)
- **Users:** Stores email, hashed password, role, and profile info.
- **CVs:** Stores structured info (personal, skills, education, work, etc.) and extracted image.
- **JDs:** Stores structured job info (title, company, skills, requirements, etc.).
- **Predictions:** Stores the results of each prediction, including similarity scores and hire probability.

---

### 4.8 API Endpoints and Their Flows
- **/user/create:** Register a new user
- **/user/login:** Login and get a JWT
- **/user/update:** Update user profile (requires JWT)
- **/user/:id:** Get user info (requires JWT)
- **/user/payment:** Create a payment intent (Stripe)
- **/upload:** Upload PDF files
- **/prediction:** Predict suitability for a single CV & JD
- **/prediction/multi:** Predict for multiple CVs (requires JWT)
- **/health:** Health check

---

## 5. Security and Validation
- **Password Hashing:** Passwords are never stored in plain text.
- **JWT Authentication:** Only users with valid tokens can access protected routes.
- **Input Validation:** All inputs are checked for correctness and safety.
- **Rate Limiting:** Prevents abuse by limiting requests per time window.
- **Helmet & CORS:** Protects against common web vulnerabilities.

---

## 6. CI/CD and Deployment
- **CI/CD:** Automated workflows test, build, and deploy the app using GitHub Actions.
- **Docker:** The app runs in containers, making it easy to deploy anywhere.
- **Environment Variables:** Sensitive info (like database passwords) is kept out of code and loaded from environment files.

---

## 7. Glossary of Technical Terms

- **API (Application Programming Interface):** A way for programs to talk to each other.
- **Backend:** The server-side part of the app that does the heavy lifting.
- **Frontend:** The user interface (not included in this repo).
- **LLM (Large Language Model):** An AI that understands and generates human language.
- **Embedding:** Turning text into numbers so computers can compare meanings.
- **Cosine Similarity:** A math formula to measure how similar two sets of numbers are.
- **JWT (JSON Web Token):** A secure way to prove who you are to a server.
- **Hashing:** Scrambling data (like passwords) so it can't be read if stolen.
- **Containerization:** Packaging an app so it runs the same everywhere.
- **CI/CD (Continuous Integration/Continuous Deployment):** Automating testing and deployment.
- **Middleware:** Code that runs between receiving a request and sending a response.
- **Schema:** A blueprint for how data is stored in a database.
- **Base64:** A way to encode images or files as text.
- **PDF:** Portable Document Format, a common file type for documents.
- **Ollama:** A tool to run LLMs locally.
- **OpenCV:** A library for computer vision (finding faces in images).
- **Stripe:** A service for handling online payments.

---

**End of Explanation** 