

export default function OnbordingPageLayout({ children }) {
  return (
    <div className="container w-screen">
          <div className="fixed bg-gradient-to-b from-sky-400 vai-sky-500 to-sky-700 flex flex-row justify-centerw-full">
                <div className="w-screen h-screen relativem">
                    <div className="relative w-screen h-screen top-0 left-0" >
                    <div className="absolute w-11/12 h-[20] top-[9px] bottom-[9px] left-[60px] bg-white rounded-3xl overflow-auto">
                      {children}
                    </div>
                  </div>
                </div>
            </div>
          </div>
  )
}
