

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
// import { loginUser, clearError } from "@/lib/redux/features/auth/authSlice"
// import { DASHBOARD_ROUTES } from "@/lib/utils/constants"
// import { Facebook, Twitter, Instagram, Eye, EyeOff } from "lucide-react"

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const dispatch = useAppDispatch()
//   const { isAuthenticated, isLoading, error, user, admin } = useAppSelector((state) => state.auth)

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)

//   // Handle navigation after successful authentication
//   useEffect(() => {
//     if (isAuthenticated) {
//       // const redirect = searchParams.get("redirect")

//       if (admin) {
//         // Admin login - redirect to admin panel
//         router.push('/admin')
//       } else if (user) {
//         // User login - redirect based on user type
//         router.push(DASHBOARD_ROUTES[user.user_type])
//       }
//     }
//   }, [isAuthenticated, user, admin, router])

//   // Clear error when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearError())
//     }
//   }, [dispatch])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await dispatch(loginUser(formData))
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{
//         backgroundImage: "url('https://res.cloudinary.com/mae-com-in/image/upload/v1761671719/smudged-green-pink-colored-white-backdrop_ixlurb.jpg')", // ✅ your image path
//       }}
//     >

//       <div className="relative w-full max-w-5xl flex items-center justify-center p-8">
//         <div className="w-full bg-white max-w-lg border py-5 px-8 space-y-8">

//           <div className="space-y-2">
//             <h1 className="text-5xl font-bold">
//               <span className="text-[var(--brand)]/70">Hello,</span>
//               <br />
//               <span className="text-[var(--brand)]">welcome!</span>
//             </h1>
//           </div>

//           {error && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//               <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6 mt-12">
//             {/* Email Input */}
//             <div className="relative">
//               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="name@mail.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-6 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
//                 required
//               />
//               <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Email address</label>
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="••••••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-6 pr-12 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
//                 required
//               />
//               <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Password</label>
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 border-2 border-gray-300 rounded accent-[var(--brand)]"
//                 />
//                 <span className="text-gray-600">Remember me</span>
//               </label>
//               <Link href="/forgot-password" className="text-gray-400 hover:text-gray-600">
//                 Forget password?
//               </Link>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 bg-[var(--brand)] text-white font-bold py-3 rounded hover:bg-[var(--brand)]/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Signing in...
//                   </span>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//               <Link
//                 href="/signup"
//                 className="flex-1 border-2 border-[var(--brand)] text-[var(--brand)] font-bold py-3 rounded hover:bg-blue-50 transition-colors text-center"
//               >
//                 Sign up
//               </Link>
//             </div>
//           </form>

//           {/* Social Media */}
//           <div className="flex items-center gap-6 pt-8">
//             <span className="text-sm text-gray-400 font-semibold">FOLLOW</span>
//             <div className="flex gap-4">
//               <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <Instagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>


//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { loginUser, clearError } from "@/lib/redux/features/auth/authSlice"
import { DASHBOARD_ROUTES } from "@/lib/utils/constants"
import { Facebook, Twitter, Instagram, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading, error, user, admin } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Handle navigation after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect")

      if (redirect) {
        // Use the redirect parameter if provided
        router.push(redirect)
      } else if (admin) {

        router.push('/admin')
      } else if (user) {
        // User login - redirect based on user type
        router.push(DASHBOARD_ROUTES[user.user_type])
      }
    }
  }, [isAuthenticated, user, admin, router, searchParams])

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(loginUser(formData))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/mae-com-in/image/upload/v1761671719/smudged-green-pink-colored-white-backdrop_ixlurb.jpg')",
      }}
    >
      <div className="relative w-full max-w-5xl flex items-center justify-center p-8">
        <div className="w-full bg-white max-w-lg border py-5 px-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold">
              <span className="text-[var(--brand)]/70">Hello,</span>
              <br />
              <span className="text-[var(--brand)]">welcome!</span>
            </h1>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
              <input
                type="email"
                name="email"
                placeholder="name@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-6 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Email address</label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-6 pr-12 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-2 border-gray-300 rounded accent-[var(--brand)]"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-gray-400 hover:text-gray-600">
                Forget password?
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[var(--brand)] text-white font-bold py-3 rounded hover:bg-[var(--brand)]/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <Link
                href="/signup"
                className="flex-1 border-2 border-[var(--brand)] text-[var(--brand)] font-bold py-3 rounded hover:bg-blue-50 transition-colors text-center"
              >
                Sign up
              </Link>
            </div>
          </form>

          {/* Social Media */}
          <div className="flex items-center gap-6 pt-8">
            <span className="text-sm text-gray-400 font-semibold">FOLLOW</span>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}