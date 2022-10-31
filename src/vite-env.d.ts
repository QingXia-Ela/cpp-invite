import 'vite/client'

declare module '*.obj' {
  const path: string
  export default path
}
