# Scano QR Generator v1.0

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green.svg)

**Scano QR Generator** is a web application for generating, managing, and securely storing QR codes. Built with Next.js, React, and Supabase, it offers a smooth user experience and advanced authentication and data management functionalities.

## Key Features

### Complete Authentication System
- **User registration** with email validation
- **Secure login** system
- **Password recovery** via email
- **Automatic session management**
- **Route protection** for authenticated users

### QR Code Generation
- **Real-time generation** of QR codes
- **Instant preview** of the generated code
- **Customization** with title and description
- **Multiple data formats** supported

### QR Code Management
- **Personal list** of all your generated QR codes
- **Search and filtering** by title
- **Smart pagination** (9 items per page)
- **Deletion** of unwanted codes

## Screenshots
<img width="1918" height="868" alt="Scano-Screenshot" src="https://github.com/user-attachments/assets/adf2f937-1897-4c34-bbd5-907349c9d757" />
<img width="1918" height="786" alt="Scano-Screenshot 2" src="https://github.com/user-attachments/assets/bf67fbcb-d18b-4eab-985a-a38266877469" />


## Technologies Used

### Frontend
- **Next.js** - React framework for web applications
- **React** - Library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **CSS Modules** - Modular and encapsulated styling
- **Lucide React** - Modern and lightweight icons

### Backend & Database
- **Supabase**
  - User authentication
  - PostgreSQL database
  - Row Level Security (RLS)
  - Automatic RESTful APIs

### Development Tools
- **ESLint** - Linter for JavaScript/TypeScript code
- **TypeScript** - Static typing for JavaScript

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   ├── signup/               # Registration page
│   │   ├── forgot-password/      # Password recovery
│   │   └── confirm/              # Email confirmation
│   ├── (home)/                   # Protected main page
│   └── error/                    # Error page
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   │   ├── forms/                # Login/registration forms
│   │   └── signout-button/       # Sign out button
│   ├── home/                     # Main page components
│   │   └── sections/             # Application sections
│   │       ├── generate-qr-section/  # QR generation
│   │       └── qr-list-section/      # QR list
│   └── ui/                       # Generic UI components
│       ├── alerts/               # Alerts and notifications
│       ├── footer/               # Footer
│       ├── nav/                  # Navigation
│       └── ToastProvider.tsx     # Notification provider
├── utils/                        # Utilities and configurations
│   └── supabase/                 # Supabase configuration
└── middleware.ts                 # Authentication middleware
```

## Author

**Santino Ventrice**
- GitHub: [@SantiVentri](https://github.com/SantiVentri)
- LinkedIn: [Santino Ventrice](https://linkedin.com/in/santinoventrice)
