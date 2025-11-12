import MyInput from "@/components/my-components/MyInput"
import { Eye, HeartPulseIcon, MessageSquare, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import registrationPic from "../assets/companyRegistration.png"

const CompanyRegistration: React.FC = () => {
  return (
    <div
      id="company-registration-container"
      className="flex w-full justify-center"
    >
      <div
        id="inner-container"
        className="flex w-10/12 md:flex-row flex-col md:space-x-28"
      >
        <div id="setup-form" className="flex flex-1 flex-col">
          <div className="text-2xl text-gray-200 font-medium">
            Create Your Workspace
          </div>
          <div className="text-sm[1em] mt-0.5 text-gray-400">
            Start building a happier, more connected remote team today.
          </div>
          <div id="form" className="mt-4">
            <div>
              <MyInput
                id="company-name"
                title="Company Name"
                placeholder="Enter your company's name."
              />
            </div>

            <div className="mt-3">
              <MyInput
                id="location"
                title="Company's Location"
                placeholder="Eg. city, state, country"
              />
            </div>
            <div className="mt-3">
              <MyInput
                id="email"
                title="Your Email"
                placeholder="Eg. henry@delta.com"
                helperText="This email will be associated to admin account."
              />
            </div>
            <div className="mt-3 relative">
              <MyInput
                id="password"
                title="Password"
                placeholder="Create a strong password"
              />
              <Eye
                color="#d1d5dc"
                className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
              />
            </div>
            <div className="mt-3 relative">
              <MyInput
                id="confirmPassword"
                title="Confirm Password"
                placeholder="Repeat your password"
              />
              <Eye
                color="#d1d5dc"
                className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
              />
            </div>
            <div className="mt-5">
              <Button className="bg-blue-400/80 hover:bg-[#4A90E2] cursor-pointer w-full">
                Create Admin Account
              </Button>
            </div>
          </div>
        </div>
        <div id="more-information" className="flex flex-1 flex-col">
          <div className="flex flex-col justify-center overflow-hidden">
            <div
              id="image-container"
              className="aspect-video w-10/12 overflow-hidden rounded-2xl"
            >
              <img
                src={registrationPic}
                alt="registrationPic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 pl-1 w-10/12">
              <div className="text-2xl  text-gray-200 font-medium">
                Unlock Your Team's Potential.
              </div>
              <div className="text-sm[1em] mt-1 text-gray-400">
                Atmos helps you build a thriving remote culture with tools
                designed for connection and transparency.
              </div>
            </div>
            <ul className="flex flex-col w-10/12 mt-4 h-72">
              <li className="flex flex-row w-full">
                <span className="text-blue-400 pr-3 pt-0.5">
                  <HeartPulseIcon />
                </span>
                <div className="flex flex-col">
                  <p className="text-gray-300">Real-time team pulse checks</p>
                  <div className="text-sm[1em] mt-0.5 text-gray-400">
                    Stay in tune with your team's morale and well-being.
                  </div>
                </div>
              </li>
              <li className="flex flex-row w-full mt-3">
                <span className="text-blue-400 pr-3 pt-0.5">
                  <MessageSquare />
                </span>
                <div className="flex flex-col">
                  <p className="text-gray-300">
                    Anonymous Q&amp;A for open communication
                  </p>
                  <div className="text-sm[1em] mt-0.5 text-gray-400">
                    Foster a culture of trust with safe spaces for honest
                    feedback.
                  </div>
                </div>
              </li>
              <li className="flex flex-row w-full mt-3">
                <span className="text-blue-400 pr-3 pt-0.5">
                  <PartyPopper />
                </span>
                <div className="flex flex-col">
                  <p className="text-gray-300">
                    Celebrate wins with a Kudos feed
                  </p>
                  <div className="text-sm[1em] mt-0.5 text-gray-400">
                    Boost motivation by recognizing and celebrating achievements
                    together.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyRegistration
