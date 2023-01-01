import { StatusBarStyle } from "expo-status-bar"
import { Platform } from "react-native"
import { AppFonts } from "../hooks/core/useCachedResources"

export type AppTheme = typeof BasicTheme
export interface ThemeObject extends Object {
    theme: AppTheme
}

export type BasicMetrics = "xs" | "sm" | "md" | "lg" | "xl"

const Pallet = {
    transparent: "transparent",
    white: "#FFF",

    main_100: "#FBE4D9",
    main_200: "#F7C5B4",
    main_300: "#E9998A",
    main_400: "#D36F68",
    main:     "#B73B3D",
    main_600: "#9D2B36",
    main_700: "#831D31",
    main_800: "#6A122B",
    main_900: "#570B27",

    basic_100: "#F5F5F5",
    basic_200: "#E3E3E3",
    basic_300: "#B3B3B3",
    basic_400: "#808080",
    basic: "#4A4A4A",
    basic_600: "#444444",
    basic_700: "#292929",
    basic_800: "#1F1F1F",
    basic_900: "#141414",

    basic_transparent_100: "rgba(128, 128, 128, 0.08)",
    basic_transparent_200: "rgba(128, 128, 128, 0.16)",
    basic_transparent_300: "rgba(128, 128, 128, 0.24)",
    basic_transparent_400: "rgba(128, 128, 128, 0.32)",
    basic_transparent_500: "rgba(128, 128, 128, 0.4)",
    basic_transparent_600: "rgba(128, 128, 128, 0.48)",

    warn_100: "#FFF4CF",
    warn_200: "#FFE69F",
    warn_300: "#FFD46F",
    warn_400: "#FFC24B",
    warn: "#ffa510",
    warn_600: "#DB850B",
    warn_700: "#B76808",
    warn_800: "#934D05",
    warn_900: "#7A3B03",

    info_100: "#CCFDFF",
    info_200: "#99F4FF",
    info_300: "#66E5FF",
    info_400: "#3FD2FF",
    info: "#00B2FF",
    info_600: "#008ADB",
    info_700: "#0067B7",
    info_800: "#004993",
    info_900: "#00347A",

    success_100: "#CDFADD",
    success_200: "#9DF6C5",
    success_300: "#68E6AD",
    success_400: "#41CD9B",
    success: "#10ac84",
    success_600: "#0B937E",
    success_700: "#087B74",
    success_800: "#056063",
    success_900: "#034852",

    danger_100: "#FEDCD1",
    danger_200: "#FDB3A3",
    danger_300: "#F97F74",
    danger_400: "#F35153",
    danger: "#ec1b30",
    danger_600: "#CA1336",
    danger_700: "#A90D39",
    danger_800: "#880838",
    danger_900: "#710537",

    error_100: "#FEE7DC",
    error_200: "#FDCBB9",
    error_300: "#FAA795",
    error_400: "#F6847A",
    error: "#F04F4F",
    error_600: "#CE3946",
    error_700: "#AC273E",
    error_800: "#8B1936",
    error_900: "#730F31",
}

const Colors = {
    ...Pallet,
    bg: {
        light: Pallet.basic_100,
        medium: Pallet.basic_200,
        default: Pallet.basic_300,
        dark: Pallet.basic_600,
    },
    fg: {
        main: Pallet.main,
        main_dark: Pallet.main,

        light: Pallet.basic_400,
        default: Pallet.basic,
        dark: Pallet.basic_600,

        link: Pallet.main,
        success: Pallet.success,
        error: Pallet.error,
        info: Pallet.info_600,
        danger: Pallet.danger,
        warn: Pallet.warn,

        orange: "#e35a0b",
        purple: "#a83297",
    },

    login: {
        bg: {
            main: Pallet.basic_600,
        },
        fg: {
            main: "#1DF29A",
            link: "#1DF29A",
        }
    }
}

const Metrics = {
    spacing: {
        xs: 3,
        sm: 5,
        md: 10,
        lg: 20,
        xl: 30
    },
    rouding: {
        xs: 3,
        sm: 5,
        md: 10,
        lg: 50,
        xl: 100
    },
    text: {
        //headers
        h1: 28,
        h2: 26,
        h3: 24,
        h4: 22,
        h5: 20,
        h6: 18,

        //subtitles
        s1: 15,
        s2: 14,

        //paragraphs
        p1: 13.5,
        p2: 12.5,

        //captions
        c1: 12,
        c2: 11,

        //label
        lb: 12
    },
    icon: {
        xs: 18,
        sm: 25,
        md: 30,
        lg: 80,
        xl: 100
    },
    image: {
        xs: 40,
        sm: 50,
        md: 70,
        lg: 100,
        xl: 150
    }
}

const Fonts = {
    fontFamily: AppFonts.roboto,

    //headers

    h1: {
        fg: Colors.fg.dark,
        size: Metrics.text.h1,
        weight: "800",
        family: AppFonts.latoBlack
    },

    h2: {
        fg: Colors.fg.dark,
        size: Metrics.text.h2,
        weight: "700",
        family: AppFonts.latoBlack
    },

    h3: {
        fg: Colors.fg.dark,
        size: Metrics.text.h3,
        weight: "600",
        family: AppFonts.latoBlack
    },

    h4: {
        fg: Colors.fg.dark,
        size: Metrics.text.h4,
        weight: "500",
        family: AppFonts.latoBlack
    },

    h5: {
        fg: Colors.fg.dark,
        size: Metrics.text.h5,
        weight: "400",
        family: AppFonts.latoBlack
    },

    h6: {
        fg: Colors.fg.dark,
        size: Metrics.text.h6,
        weight: "300",
        family: AppFonts.latoBlack
    },

    //subtitles

    s1: {
        fg: Colors.fg.dark,
        size: Metrics.text.s1,
        weight: "600",
        family: AppFonts.latoBlack
    },

    s2: {
        fg: Colors.fg.dark,
        size: Metrics.text.s2,
        weight: "500",
        family: AppFonts.latoBlack
    },

    //paragraphs

    p1: {
        fg: Colors.fg.default,
        size: Metrics.text.p1,
        weight: "400",
        family: AppFonts.roboto
    },

    p2: {
        fg: Colors.fg.default,
        size: Metrics.text.p2,
        weight: "300",
        family: AppFonts.roboto
    },

    //captions

    c1: {
        fg: Colors.fg.light,
        size: Metrics.text.c1,
        weight: "400",
        family: AppFonts.roboto
    },

    c2: {
        fg: Colors.fg.light,
        size: Metrics.text.c2,
        weight: "300",
        family: AppFonts.roboto
    },

    //labels

    lb: {
        fg: Colors.fg.dark,
        size: Metrics.text.lb,
        weight: "800",
        family: AppFonts.openSansBold
    },
}

export const BasicTheme = {
    colors: Colors,
    fonts: Fonts,
    fontFamilies: AppFonts,
    metrics: Metrics,

    header: {
        bg: {
            primary: "#ae2c20",
        },
        title: {
            fg: {
                primary: Colors.white
            },
            family: AppFonts.robotoBold,
            size: Metrics.text.h6
        }
    },

    statusbar: {
        bg: "#ab241a",
        theme: "light" as StatusBarStyle
    },

    bottomNavigation: {
        bg: {
            primary: "white",
            secondary: "white"
        },
        fg: {
            primary: Colors.fg.main,
            secondary: Pallet.basic_400
        },
    },

    login: {
        bg: {
            main: "#dadada",
            medium: "#c9c9c9"
        },
        fg: {
            light: Pallet.basic,
            dark: Pallet.basic_700
        },
        icon: {
            fg: Pallet.main
        }
    },

    page: {
        padding: {
            horizontal: 20,
            vertical: 20,
        },
        bg: "#FFFFFF",
        divider: {
            bg: "#F0F0F0",
            width: 1
        }
    },

    modal: {
        bg: "rgba(0,0,0,0.6)",
        rounding: 15,
        margin: {
            horizontal: Metrics.spacing.lg,
            vertical: Metrics.spacing.md
        },
        header: {
            title: {
                size: Fonts.h6.size * .9,
                fg: Pallet.basic,
                family: AppFonts.robotoCondensedBold,
                weight: 300
            },
            padding: {
                vertical: 40,
                horizontal: 20
            }
        },
        body: {
            padding: {
                vertical: 15,
                horizontal: 20
            },
            text: {
                size: Fonts.s2.size,
                fg: Pallet.basic,
                family: AppFonts.robotoCondensed,
                weight: 300
            }
        },
        footer: {
            padding: {
                vertical: 15,
                horizontal: 20
            },
            button: {
                size: Fonts.s1.size,
                fg: {
                    submit: Pallet.success_600,
                    cancel: Pallet.basic,
                },
                family: AppFonts.robotoCondensedBold,
                weight: 300
            }
        }
    },

    dialogs: {
        warning: {
            bg: Pallet.error_200,
            padding: {
                horizontal: Metrics.spacing.md,
                vertical: Metrics.spacing.md,
            },
            message: {
                fg: Pallet.error_800,
                size: Fonts.p2.size,
            }
        }
    },

    input: {
        minHeight: Platform.OS === "ios" ? 45 : 50,
        fontSize: 15,
        padding: {
            horizontal: 20,
            vertical: 0,
        },
        bg: {
            default: Colors.white,
            error: Colors.error_100,
            disabled: Colors.bg.light
        },
        fg: {
            default: Colors.fg.dark,
            error: Colors.error,
            disabled: Colors.fg.light
        },
        border: {
            size: 1,
            rouding: 100,
            bg: {
                default: Colors.basic_300,
                error: Colors.error,
                disabled: Colors.bg.light,
            },
        },
        placeholder: {
            fg: {
                default: Colors.fg.light,
                error: Colors.error_400,
                disabled: Colors.fg.light,
            }
        },
        icon: {
            size: 20,
            bg: {
                default: Colors.fg.light,
                error: Colors.error_400,
                disabled: Colors.fg.light,
            }
        }
    },

    button: {
        minHeight: Platform.OS === "ios" ? 45 : 50,
        fontSize: 14,
        bold: true,
        uppercase: true,
        padding: {
            horizontal: 15,
            vertical: 0
        },
        rouding: 10,
        bg: {
            default: {
                submit: Colors.fg.main,
                basic: Colors.basic_200,
                info: Colors.info,
                error: Colors.fg.error,
            },
            login: {
                submit: Colors.fg.main,
                basic: Colors.basic_200,
                info: Colors.info,
                error: Colors.fg.error,
            },
            outline: {
                submit: Colors.white,
                basic: Colors.white,
                info: Colors.white,
                error: Colors.white,
            },
            dashed: {
                submit: "transparent",
                basic: "transparent",
                info: "transparent",
                error: "transparent",
            }
        },
        fg: {
            default: {
                submit: Colors.white,
                basic: Colors.bg.dark,
                info: Colors.white,
                error: Colors.white,
            },
            login: {
                submit: Colors.white,
                basic: Colors.bg.dark,
                info: Colors.white,
                error: Colors.white,
            },
            outline: {
                submit: Colors.fg.main,
                basic: Colors.fg.dark,
                info: Colors.fg.info,
                error: Colors.fg.error,
            },
            dashed: {
                submit: Colors.fg.main,
                basic: Colors.fg.dark,
                info: Colors.fg.info,
                error: Colors.fg.error,
            }
        }
    },

    list: {
        item: {
            bg: {
                default: Colors.white,
                pressed: Colors.basic_200,
                selected: "#E7E7E7"
            },
            title: {
                size: Fonts.s1.size,
                fg: Colors.fg.dark,
                family: AppFonts.robotoBold,
                weight: 300
            },
            subtitle: {
                size: Fonts.p2.size,
                fg: Colors.fg.dark,
                family: AppFonts.roboto,
                weight: 300
            },
            padding: {
                horizontal: Metrics.spacing.lg,
                vertical: Metrics.spacing.md * 1.5
            }
        }
    }
}

export type ForegroundColors = "fg:default" | "fg:light" | "fg:dark" | "fg:main" | "fg:info" | "fg:danger" | "fg:error" | "fg:success" | "fg:warn"

export function getForegroundColor(color: string | undefined, theme: AppTheme): any {
    if (!color) return theme.colors.fg.main
    return color?.startsWith("fg:") ? theme.colors.fg[color.split(":")[1]] : color;
}

export type BackgroundColors = "bg:default" | "bg:light" | "bg:medium" | "bg:dark" | "bg:main" 

export function getBackgroundColor(color: string | undefined, theme: AppTheme): any {
    if (!color) return theme.colors.fg.main
    return color?.startsWith("bg:") ? theme.colors.bg[color.split(":")[1]] : color;
}