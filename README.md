# Scano QR Generator v1.0.1

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
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

### Account Settings
- **Change username**
- **Change password**
- **Sign out**
- **Account deletion**

## Screenshots
<img width="1919" height="817" alt="image" src="https://github.com/user-attachments/assets/d7749082-0a42-4951-be1d-23066d695b5a" />
<img width="1838" height="501" alt="image" src="https://github.com/user-attachments/assets/4302149d-6a3f-4264-ae3c-f612705559b1" />
<img width="1919" height="773" alt="image" src="https://github.com/user-attachments/assets/ae350379-6685-4449-8b78-3eb1286a2128" />


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
├─ app/
│  ├─ (auth)/
│  │  ├─ confirm/
│  │  ├─ forgot-password/
│  │  ├─ login/
│  │  └─ signup/
│  ├─ (home)/
│  │  └─ account/
│  └─ error/
├─ components/
│  ├─ auth/
│  │  ├─ delete-account-button/
│  │  ├─ forms/
│  │  └─ signout-button/
│  ├─ home/
│  │  ├─ account/
│  │  │  └─ settings-item/
│  │  ├─ modal/
│  │  └─ sections/
│  │     ├─ generate-qr-section/
│  │     │  ├─ form/
│  │     │  └─ preview/
│  │     └─ qr-list-section/
│  │        └─ card/
│  └─ ui/
│     ├─ alerts/
│     ├─ footer/
│     └─ nav/
└─ utils/
   └─ supabase/
```

## Author

**Santino Ventrice**
- GitHub: [@SantiVentri](https://github.com/SantiVentri)
- LinkedIn: [Santino Ventrice](https://linkedin.com/in/santinoventrice)
