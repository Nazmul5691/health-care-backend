# 🩺 Doctorate — Online Healthcare Consultation Platform (Backend)

The backend engine for **Doctorate**, a scalable, role-based healthcare system. This server manages the complex business logic for doctor-patient interactions, secure scheduling, automated billing, and real-time medical record management.

🔗 **Frontend Live Demo:** [Doctorate Web](https://health-care-frontend-tshw.vercel.app/)

---

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Distinct permissions and dashboards for `ADMIN`, `DOCTOR`, and `PATIENT`.
*   **Secure Authentication:** 
    *   JWT-based Access and Refresh token lifecycle.
    *   Secure cookie-based authentication via `cookie-parser`.
    *   Password hashing using `bcryptjs`.
*   **Advanced Scheduling & Appointments:** 
    *   Dynamic slot generation for doctors.
    *   Automated status updates via `node-cron`.
*   **Financial Integration:** 
    *   Secure payments via **Stripe**.
    *   Webhook integration for real-time payment confirmation.
*   **Media & Records:** 
    *   Profile and document management via **Cloudinary** and **Multer**.
    *   Type-safe medical records using **Prisma ORM**.
*   **Email Engine:** Automated notifications for appointments and password resets via **Nodemailer**.

---

## 🛠 Tech Stack

*   **Runtime:** Node.js (v20+)
*   **Framework:** Express.js v5.1.0 (Next-gen Express)
*   **Language:** TypeScript v5.8.3
*   **Database:** PostgreSQL
*   **ORM:** Prisma v6.11.1
*   **Validation:** Zod v4.0.3
*   **File Storage:** Cloudinary & Multer
*   **Security:** JWT, BcryptJS, Express-Rate-Limit, CORS

---

## 🗂 Project Structure

The project follows a **Modular Architecture** to ensure maintainability as the system grows.

```text
src/
├── app/
│   ├── errors/           # Custom error handling logic
│   ├── interfaces/       # Common TypeScript interfaces
│   ├── middlewares/      # Auth guards, Global Error Handler, Validation
│   ├── modules/          # Business Logic Modules
│   │   ├── admin/        # System & User management
│   │   ├── appointment/  # Booking & status logic
│   │   ├── auth/         # Login, Register, Token Refresh
│   │   ├── doctor/       # Profiles, Search, & Schedules
│   │   ├── doctorSchedule/ # Specific slot management
│   │   ├── meta/         # Statistics & Dashboard metadata
│   │   ├── patient/      # Medical history & Profile
│   │   ├── payment/      # Stripe integration
│   │   ├── prescription/ # E-prescription management
│   │   ├── review/       # Ratings & Feedback
│   │   ├── schedule/     # General time slot logic
│   │   ├── specialties/  # Medical category management
│   │   └── user/         # Core user identity logic
│   └── routes/           # Centralized API route index
├── config/               # Environment variables (dotenv)
├── helpers/              # Pagination, generic pickers
├── shared/               # Reusable utility functions
├── app.ts                # Express application configuration
└── server.ts             # Server entry point & listener
prisma/
└── schema/               # Modular Prisma schema files

---

## ⚙️ Setup & Installation

### Prerequisites

Ensure you have the following installed and configured:

- **Node.js** (v20 or higher)
- **PostgreSQL** Database instance
- **Stripe Account** (for handling payments)
- **Cloudinary Account** (for image/file uploads)

---

###  Installation

Clone the repository and install the necessary dependencies:
```bash
git clone <your-repo-url>
cd doctorate-backend
npm install
```

---

###  Environment Configuration

Create a `.env` file in the root directory and populate it with your credentials:
```env
PORT=5000
NODE_ENV="development"
DATABASE_URL="postgresql://user:password@localhost:5432/doctorate"

# Auth
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"

# Payment (Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Media (Cloudinary)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

### 4. Database Setup

Sync your Prisma schema with your database and generate the client:
```bash
# Push schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate
```

---

## 📜 Available Scripts

| Script | Action |
|---|---|
| `npm run dev` | Runs the server in development mode with ts-node-dev (auto-reload). |
| `npm run build` | Compiles TypeScript to production JavaScript in `./dist`. |
| `npm run start` | Starts the production server from the `./dist` folder. |
| `npm run db:migrate` | Runs database migrations to keep schema in sync. |
| `npm run db:studio` | Opens Prisma Studio GUI to view/edit data in the browser. |
| `npm run stripe:webhook` | Starts listening for Stripe events locally on port 5000. |

---

## 👨‍💻 Author

**Md. Nazmul Islam**

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).