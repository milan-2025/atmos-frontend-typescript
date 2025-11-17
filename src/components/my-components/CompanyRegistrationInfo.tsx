import { HeartPulseIcon, MessageSquare, PartyPopper } from "lucide-react";

import registrationPic from "../../assets/companyRegistration.png";

const CompanyRegistrationInfo: React.FC = () => {
  return (
    <div
      id="more-information"
      className="flex flex-1 order-1 md:order-2 flex-col mt-4 md:mt-0 md:p-5"
    >
      <div className="flex flex-col justify-center overflow-hidden">
        <div
          id="image-container"
          className="aspect-video md:w-10/12 w-full overflow-hidden rounded-2xl"
        >
          <img
            src={registrationPic}
            alt="registrationPic"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 md:pl-1 pl-2 md:w-10/12 w-full">
          <div className="md:text-2xl text-xl  text-gray-200 font-medium">
            Unlock Your Team's Potential.
          </div>
          <div className="text-sm[1em] mt-1 text-gray-400">
            Atmos helps you build a thriving remote culture with tools designed
            for connection and transparency.
          </div>
        </div>
        <ul className="flex flex-col md:w-10/12 w-full  mt-4 md:pl-1 pl-2">
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
                Foster a culture of trust with safe spaces for honest feedback.
              </div>
            </div>
          </li>
          <li className="flex flex-row w-full mt-3">
            <span className="text-blue-400 pr-3 pt-0.5">
              <PartyPopper />
            </span>
            <div className="flex flex-col">
              <p className="text-gray-300">Celebrate wins with a Kudos feed</p>
              <div className="text-sm[1em] mt-0.5 text-gray-400">
                Boost motivation by recognizing and celebrating achievements
                together.
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyRegistrationInfo;
