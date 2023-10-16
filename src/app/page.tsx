

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="right-[35rem] top-[15rem] rotate-[160deg] absolute w-0 h-0 m-8 border-b-[50px] border-stone-700 border-x-[160px] border-x-transparent border-solid opacity-90 blur-xl"></div>
      <div className="right-[45rem] top-[14rem] rotate-90 absolute w-0 h-0 m-8 border-b-[50px] border-zinc-500 border-x-[40px] border-x-transparent border-solid opacity-90 blur-2xl"></div>
      <h1 className="text-primary">Welcome to Authentication Project</h1>
      
      <a className="btn-primary" href="https://github.com/kmr-sahil/auth-w-next.js">github repo...</a>
    </main>
  )
}
