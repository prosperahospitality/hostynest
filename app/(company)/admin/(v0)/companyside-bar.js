import { Button, Avatar } from "@nextui-org/react";
import { Home, BarChart, Copy, Bookmark, Users, Settings } from 'lucide-react'
import { CompanyDashLogo } from "@/_components/icon";


const CompanySideBar = () => {

  return (
    <aside className="h-screen bg-background ">
      <nav className="flex flex-col h-[92%] mt-[40%] items-center justify-between">
        <div>
          <CompanyDashLogo />
        </div>
        <div className="flex flex-col gap-4">
          <Button isIconOnly color="primary" aria-label="Like">
            <Home size={24} />
          </Button>
          <Button isIconOnly color="primary" aria-label="Like" variant="faded">
            <BarChart size={24} />
          </Button>
          <Button isIconOnly color="primary" aria-label="Like" variant="faded">
            <Copy size={24} />
          </Button>
          <Button isIconOnly color="primary" aria-label="Like" variant="faded">
            <Bookmark size={24} />
          </Button>
          <Button isIconOnly color="primary" aria-label="Like" variant="faded">
            <Users size={24} />
          </Button>
          <Button isIconOnly color="primary" aria-label="Like" variant="faded">
            <Settings size={24} />
          </Button>
        </div>
        <Avatar src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg" />
      </nav>
    </aside>
  )
}

export default CompanySideBar;