import React, { useContext, useState } from 'react'
import "./Sidebar.css";
import { SidebarData } from "../../data/Data";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion"
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../../AppContext";

const Sidebar = () => {

  const { userData, heureActuelle } = useContext(UserContext);

  const [selected, setSelected] = useState(0);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  const logutFunction = async () => {
    localStorage.removeItem('tokenUser');
    navigate('/');
  };

  return (
    <>
      <div className='bars' style={show ? { left: "60%" } : { left: "5%" }}
        onClick={() => setShow(!show)}
      >
        <UilBars />
      </div>

      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${show}` : ""}
      >

        <div className='menu'>
          {
            SidebarData && SidebarData.map((item, index) => {
              return (
                <div
                  className={selected === index ? 'menuItem' : 'menuItem'}
                  key={index}
                  onClick={() => setSelected(index)}
                >
                  <item.icon />
                  <span>
                    {
                      index === 0 ?
                        <NavLink to="/dashboard">
                          {item.heading}
                        </NavLink> :
                        index === 1 ?
                          <NavLink to="/compte/affiliation">
                            {item.heading}
                          </NavLink> :
                          index === 2 ?
                            <NavLink to="/compte/transactions">
                              {item.heading}
                            </NavLink> :
                            index === 3 ?
                              <NavLink to="/compte/cards">
                                {item.heading}
                              </NavLink> :
                              index === 4 ?
                                <NavLink to="/compte/rechargeMobie">
                                  {item.heading}
                                </NavLink> :
                                index === 5 ?
                                  <NavLink to="/bureau_de_change">
                                    {item.heading}
                                  </NavLink> : index === 6 ?
                                    <NavLink to="/pret">
                                      {item.heading}
                                    </NavLink> :
                                    index === 7 ?
                                      <NavLink to="/compte/crypto">
                                        {item.heading}
                                      </NavLink> : index === 8
                                      &&
                                      <NavLink to="/compte/config">
                                        {item.heading}
                                      </NavLink>
                    }
                  </span>
                </div>
              )
            })
          }
          <div className='menuItem'>
            <UilSignOutAlt onClick={logutFunction} style={{ cursor: "pointer" }} />
          </div>
          <div className='menuItem'>
            <NavLink to="/compte/config/profil">
              {
                heureActuelle && parseInt(heureActuelle) >= 6 && parseInt(heureActuelle) < 16 ? "Bonjour " :
                  heureActuelle && parseInt(heureActuelle) >= 16 && parseInt(heureActuelle) < 20 ? "Bonsoir " :
                    heureActuelle && parseInt(heureActuelle) >= 20 && parseInt(heureActuelle) < 6 ? "Bonne nuit " : ""
              } {userData && userData.pseudo}
            </NavLink>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar