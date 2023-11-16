import React from "react";
import CategoryButton from "../../components/CategoryButton";
import LayoutPage from "../../components/LayoutPage";
import Tabs from "../../components/Tabs";
import "./style.css";
import EventCards from "../../components/EventCards";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const categoryDatabase = [
    {
      cat: "Music",
      url: "https://www.dk-mba.com/u/images/blog/how-to-promote-a-concert/_f1500/xhow-to-promote-a-band-concert.jpg.pagespeed.ic.x96DJ8BcOM.jpg",
    },
    {
      cat: "Nightlife",
      url: "https://www.bettaeventhire.com.au/wp-content/uploads/2020/01/shutterstock_1527035324.jpg",
    },
    {
      cat: "Performing & Visual Arts",
      url: "https://s3-us-west-2.amazonaws.com/courses-images-archive-read-only/wp-content/uploads/sites/950/2015/08/26003237/2839965900_c23f818c97_b.jpg",
    },
    {
      cat: "Holidays",
      url: "https://assets.hvmag.com/2023/05/enGzzZpz-Halloween-Events.jpg",
    },
    {
      cat: "Health",
      url: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1608543180/attached_image/mengenal-hatha-yoga-dasar-dari-segala-jenis-yoga.jpg",
    },
    {
      cat: "Hobbies",
      url: "https://mymodernmet.com/wp/wp-content/uploads/2018/05/painting-ideas-2-1.jpg",
    },
    {
      cat: "Business",
      url: "https://website2021-live-e3e78fbbd3cc41f2847799-7c49c59.divio-media.com/filer_public/eb/7f/eb7fa02f-e613-486b-98cf-9e034052610e/how_to_run_an_effective_business_meeting_-_a_step-by-step_guide-min.jpg",
    },
    {
      cat: "Food & Drink",
      url: "https://www.allrecipes.com/thmb/jc6_Rv1V-OMEA4vykngh_YnUBAE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-868935172-2000-3286886566bf43819512f3fd495bb1e7.jpg",
    },
  ];

  const tabsType = [
    "All",
    "Online",
    "Free",
    "Today",
    "This weekend",
    "This month",
    "Charity & Causes",
  ];

  let databaseEvent = [
    {
      id: 1,
      name: "Yoga Meditation: Finding Peace",
      category: "Health",
      img: "https://cdn.yogajournal.com/wp-content/uploads/2020/06/istock-592680860.jpg",
      eventStart: "2023-10-27T18:30",
      eventEnd: "2023-10-27T19:30",
      location: "Online",
      caption:
        "Enhance your physical body and spiritual mind, and find peace through Yoga Meditation, join us online for citing adventure",
      description:
        "With the current trend of a fast-paced life, a lot of people forget that it is okay to slow down and o not have to be the first and the best. Our yoga session aims to help people find inner peace, with acceptance with inner self. Join us for an exciting adventure to deepen your understanding about yourself, and be at peace with your life.",
      tags: ["yoga", "meditation"],
      price: 0,
    },

    {
      id: 2,
      name: "International Business Conference",
      category: "Business",
      img: "https://marketplace.canva.com/EAFK7akFOyw/1/0/1600w/canva-green-modern-business-conference-poster-landscape-MO8kYv4ziEM.jpg",
      eventStart: "2023-10-24T10:00",
      eventEnd: "2023-10-30T14:00",
      location: "Grand City, Surabaya",
      caption:
        "Join our International Business Conference, with 3 experienced business coach & mentors that will guide you how to stay productive at home.",
      description:
        "A lot of jobs are now able to be done remotely, you can easily get an online side-job. This conference will help you and train you to get a remote side-job so you can get an extra income even when you are at your own home.",
      tags: ["yoga", "meditation"],
      price: 250000,
    },
    {
      id: 3,
      name: "Yoga Meditation: Finding Peace",
      category: "Health",
      img: "https://cdn.yogajournal.com/wp-content/uploads/2020/06/istock-592680860.jpg",
      eventStart: "2023-10-27T18:30",
      eventEnd: "2023-10-27T19:30",
      location: "Online",
      caption:
        "Enhance your physical body and spiritual mind, and find peace through Yoga Meditation, join us online for citing adventure",
      description:
        "With the current trend of a fast-paced life, a lot of people forget that it is okay to slow down and o not have to be the first and the best. Our yoga session aims to help people find inner peace, with acceptance with inner self. Join us for an exciting adventure to deepen your understanding about yourself, and be at peace with your life.",
      tags: ["yoga", "meditation"],
      price: 0,
    },
    {
      id: 4,
      name: "International Business Conference",
      category: "Business",
      img: "https://marketplace.canva.com/EAFK7akFOyw/1/0/1600w/canva-green-modern-business-conference-poster-landscape-MO8kYv4ziEM.jpg",
      eventStart: "2023-10-24T10:00",
      eventEnd: "2023-10-30T14:00",
      location: "Grand City, Surabaya",
      caption:
        "Join our International Business Conference, with 3 experienced business coach & mentors that will guide you how to stay productive at home.",
      description:
        "A lot of jobs are now able to be done remotely, you can easily get an online side-job. This conference will help you and train you to get a remote side-job so you can get an extra income even when you are at your own home.",
      tags: ["yoga", "meditation"],
      price: 250000,
    },
  ];
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  console.log(userGlobal.user);
  const [activeTab, setActiveTab] = React.useState("All");

  return (
    <LayoutPage>
      <div id="landing-page" className="text-sm md:text-base lg:text-lg">
        <section className="banner-section h-[200px] md:h-[300px] lg:h-[400px] w-full relative">
          <button className="bg-[#d2633b] text-white py-2 px-4 rounded-sm absolute bottom-4 left-3 md:left-10">
            Find your next event
          </button>
        </section>

        <section className="category-section flex items-center md:justify-around h-fit w-full overflow-scroll bg-slate-100 px-2 py-3 lg:py-6 gap-4">
          {categoryDatabase.map((value, index) => {
            return (
              <CategoryButton
                key={index}
                category={value.cat}
                src={value.url}
              />
            );
          })}
        </section>

        <section className="content-section flex flex-col w-full px-4 sm:px-16">
          <div className="tabs-area flex items-center w-full py-3 overflow-scroll">
            <ul className="flex flex-row h-fit w-fit gap-4">
              {tabsType.map((value, index) => {
                if (activeTab === value) {
                  return (
                    <Tabs
                      key={index}
                      text={value}
                      class="active"
                      onClick={() => {
                        setActiveTab(value);
                      }}
                    />
                  );
                } else {
                  return (
                    <Tabs
                      key={index}
                      text={value}
                      class=""
                      onClick={() => {
                        setActiveTab(value);
                      }}
                    />
                  );
                }
              })}
            </ul>
          </div>

          <div className="content-event-list py-2">
            <h1 className="font-bold text-[20px] mb-4">Upcoming Events</h1>
            <div className="event-cards-section flex flex-col sm:flex-row sm:justify-between gap-6">
              {databaseEvent.map((value, index) => {
                return (
                  <EventCards
                    key={index}
                    src={value.img}
                    title={value.name}
                    startDate={value.eventStart}
                    location={value.location}
                    price={value.price}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </LayoutPage>
  );
};

export default LandingPage;
