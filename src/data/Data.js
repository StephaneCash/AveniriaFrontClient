import {
    UilEstate,
    UilUsersAlt,
    UilMobileAndroidAlt,
    UilListUl,
    UilUsdSquare,
    UilSetting,
    UilCheckSquare,
    UilBitcoinAlt,
    UilCreditCard,
    UilListUiAlt,
    UilDollarAlt
} from "@iconscout/react-unicons";

import cardVisa from "../images/cardVisa.png";
import cardMaster from "../images/cardMaster.png";

export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard"
    },
    {
        icon: UilUsersAlt,
        heading: "Affiliations"
    },
    {
        icon: UilListUl,
        heading: "Transactions"
    },
    {
        icon: UilCreditCard,
        heading: "Cartes virtuelles"
    },
    {
        icon: UilMobileAndroidAlt,
        heading: "Recharge mobile"
    },
    {
        icon: UilDollarAlt,
        heading: "Bureau de change"
    },
    {
        icon: UilUsdSquare,
        heading: "Prêt"
    },
    {
        icon: UilBitcoinAlt,
        heading: "Cryptomonnaie"
    },
    {
        icon: UilSetting,
        heading: "Paramètres"
    },
];

export const CardsData = [
    {
        title: "Transactions",
        color: {
            backGround: "#13203b",
            boxShadow: "1px 1px 5px #0e172a"
        },
        barValue: 100,
        value: "25,769",
        png: UilListUiAlt,
        series: [
            {
                name: "Transactions",
                data: [1, 2, 3, 4]
            }
        ]
    },
    {
        title: "Cartes",
        color: {
            backGround: "#13203b",
            boxShadow: "1px 1px 5px #0e172a"
        },
        barValue: 75,
        value: "25,769",
        png: UilCreditCard,
        series: [
            {
                name: "Cards",
                data: [31, 40, 23, 11, 187, 156]
            }
        ]
    },
    {
        title: "Solde",
        color: {
            backGround: "#13203b",
            boxShadow: "1px 1px 5px #0e172a"
        },
        barValue: 45,
        value: "25,769",
        png: UilUsdSquare,
        series: [
            {
                name: "Solde",
                data: [31, 40, 23, 11, 187, 156]
            }
        ]
    }
]

export const UpdatesData = [
    {
        img: cardVisa,
        wallet: "Visa",
        notif: "Je suis innoverce je... transfère mes data part",
        data: "Last 24 heures"
    },
    {
        img: cardMaster,
        wallet: "Master Card",
        notif: "Je suis innoverce je... transfère mes data part",
        data: "Last 24 heures"
    },
    {
        img: cardMaster,
        wallet: "Innoverce",
        notif: "Je suis innoverce je... transfère mes data part",
        data: "Last 24 heures"
    }
]