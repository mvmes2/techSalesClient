"use client"
import { useRouter } from "next/navigation";
import { BoxUserAdmin, MenuContainer } from "./styles.ts";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BiHome, BiMailSend, BiSolidCoupon } from "react-icons/bi";
import { ImTicket } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { MenuIcon } from "./MenuIcon.jsx";
import { RiBracesLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { SiPrismic } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { FaTruckMoving } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { browserStorage } from "@/utils/browserStorage";

const menus = [
  {
    icon: <BiHome />,
    route: "/user-home",
    title: "Home",
  },
  {
    icon: <HiUserGroup />,
    route: "/clientes",
    title: "Clientes",
  },
  {
    icon: <FaTruckMoving />,
    route: "/estoque",
    title: "Estoque",
  },
  {
    icon: <GrHostMaintenance />,
    route: "/servicos",
    title: "Serviços",
  },
  {
    icon: <FaGear />,
    route: "/config",
    title: "Configurações",
  },
];

type SideBarMenuProps = {
  $isOpen: boolean;
  setSideBarMenuIsOpen: (bool: boolean) => void;
};


export default function SideBarMenu({ $isOpen, setSideBarMenuIsOpen }: SideBarMenuProps) {

  const pathname = usePathname();
  const pathRoute = pathname.split("/")[1];
  const { push } = useRouter();


  return (
    <MenuContainer $isOpen={$isOpen}>
      {$isOpen ? (
        <AiOutlineMenuFold title="Retrair" onClick={() => setSideBarMenuIsOpen(false)} />
      ) : (
        <AiOutlineMenuUnfold title="Expandir" onClick={() => setSideBarMenuIsOpen(true)} />
      )}

      {$isOpen ? (
        <nav>
          {menus.map((menu) => (
            <Link key={menu.title} href={menu.route} passHref >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: pathRoute === menu.route.split('/')[1] ? 'yellow' : 'black' }}>
                {menu.icon} {'. '}
                {menu.title}
              </div>
            </Link>
          ))}
        </nav>
      ) : (
        <nav>
          {menus.map((menu) => (
            <MenuIcon
              key={menu.title}
              title={menu.icon}
              content={menu.title}
              toUrl={`${menu.route}`}
            />
          ))}
        </nav>
      )}

      <BoxUserAdmin>
        <button onClick={() => {push('/'); localStorage.removeItem('session');}}>
          { 'Sair'} <FiLogOut />
        </button>
      </BoxUserAdmin>
    </MenuContainer>
  );
}
