// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
// import { registerUser } from "@/lib/redux/features/auth/authSlice"
// import type { UserType } from "@/types/user.types"
// import { USER_TYPES, DASHBOARD_ROUTES } from "@/lib/utils/constants"
// import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"

// export default function RegisterPage() {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const { isAuthenticated, isLoading, error, user } = useAppSelector((state) => state.auth)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     user_type: "user" as UserType,
//   })

//   const [validationError, setValidationError] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [passwordStrength, setPasswordStrength] = useState(0)

//   useEffect(() => {
//     const password = formData.password
//     let strength = 0
//     if (password.length >= 8) strength++
//     if (/[A-Z]/.test(password)) strength++
//     if (/[0-9]/.test(password)) strength++
//     if (/[^A-Za-z0-9]/.test(password)) strength++
//     setPasswordStrength(strength)
//   }, [formData.password])

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       router.push(DASHBOARD_ROUTES[user.user_type])
//     }
//   }, [isAuthenticated, user, router])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setValidationError("")

//     if (formData.password !== formData.confirm_password) {
//       setValidationError("Passwords do not match")
//       return
//     }

//     if (formData.password.length < 8) {
//       setValidationError("Password must be at least 8 characters")
//       return
//     }

//     await dispatch(registerUser(formData))
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength === 0) return "bg-gray-300"
//     if (passwordStrength === 1) return "bg-red-500"
//     if (passwordStrength === 2) return "bg-yellow-500"
//     if (passwordStrength === 3) return "bg-blue-500"
//     return "bg-green-500"
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md">
//         <div className="relative">
//           {/* Gradient border effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>

//           {/* Main card */}
//           <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Create Account
//               </h1>
//               <p className="text-gray-600 mt-2 text-sm">Join our creative community</p>
//             </div>

//             {/* Error Alert */}
//             {(error || validationError) && (
//               <div className="mb-6 p-4 bg-red-50/80 backdrop-blur border border-red-200/50 rounded-lg flex gap-3">
//                 <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-red-700">{error || validationError}</p>
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
//                   placeholder="John Doe"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               {/* Account Type */}


//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>

//                 {formData.password && (
//                   <div className="mt-2 space-y-2">
//                     <div className="flex gap-1">
//                       {[...Array(4)].map((_, i) => (
//                         <div
//                           key={i}
//                           className={`h-1 flex-1 rounded-full transition-all ${
//                             i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-600">
//                       {passwordStrength === 0 && "Very weak"}
//                       {passwordStrength === 1 && "Weak"}
//                       {passwordStrength === 2 && "Fair"}
//                       {passwordStrength === 3 && "Good"}
//                       {passwordStrength === 4 && "Strong"}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label htmlFor="confirm_password" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="confirm_password"
//                     name="confirm_password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     required
//                     value={formData.confirm_password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>

//                 {formData.confirm_password && (
//                   <div className="mt-2 flex items-center gap-2">
//                     {formData.password === formData.confirm_password ? (
//                       <>
//                         <CheckCircle2 className="w-4 h-4 text-green-500" />
//                         <p className="text-xs text-green-600">Passwords match</p>
//                       </>
//                     ) : (
//                       <>
//                         <AlertCircle className="w-4 h-4 text-red-500" />
//                         <p className="text-xs text-red-600">Passwords do not match</p>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Creating account...
//                   </span>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition">
//                   Sign in
//                 </Link>
//               </p>
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
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { registerUser } from "@/lib/redux/features/auth/authSlice"
import type { UserType } from "@/types/user.types"
import { DASHBOARD_ROUTES } from "@/lib/utils/constants"
import { Facebook, Twitter, Instagram, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading, error, user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: "user" as UserType,
  })

  const [validationError, setValidationError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }, [formData.password])

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(DASHBOARD_ROUTES[user.user_type])
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")

    if (formData.password !== formData.confirm_password) {
      setValidationError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters")
      return
    }

    await dispatch(registerUser(formData))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300"
    if (passwordStrength === 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/mae-com-in/image/upload/v1761671719/smudged-green-pink-colored-white-backdrop_ixlurb.jpg')", // ✅ your image path
      }}
    >

      <div className="relative w-full max-w-5xl flex items-center justify-center p-8">
        <div className="w-full bg-white max-w-lg border py-5 px-8 space-y-8">

          <div className="space-y-2">
            <h1 className="text-5xl font-bold">
              <span className="text-[var(--brand)]/60">Create</span>
              <br />
              <span className="text-[var(--brand)]">account!</span>
            </h1>
          </div>

          {(error || validationError) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error || validationError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-6 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Full name</label>
            </div>

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

            {formData.password && (
              <div className="space-y-2 -mt-4">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  {passwordStrength === 0 && "Very weak"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Fair"}
                  {passwordStrength === 3 && "Good"}
                  {passwordStrength === 4 && "Strong"}
                </p>
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)] rounded-l"></div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="••••••••••••"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full pl-6 pr-12 py-3 border border-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-400">Confirm password</label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.confirm_password && (
              <div className="flex items-center gap-2 -mt-4">
                {formData.password === formData.confirm_password ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <p className="text-xs text-green-600">Passwords match</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-xs text-red-600">Passwords do not match</p>
                  </>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[var(--brand)] text-white font-bold py-3 rounded hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
              <Link
                href="/login"
                className="flex-1 border-2 border-[var(--brand)] text-[var(--brand)] font-bold py-3 rounded hover:bg-blue-50 transition-colors text-center"
              >
                Login
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

      {/* Right Panel - Gradient Background */}
      {/* <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-blue-400">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-80 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-60 blur-2xl"></div>
      </div> */}
    </div>
  )
}
