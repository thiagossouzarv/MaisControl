import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const useHiddenStatusBar = () => {
    useEffect(function esconderStatusBar() {
        StatusBar.setHidden(true);

        return () => StatusBar.setHidden(false);
    });

    useFocusEffect(function esconderStatusBar() {
        StatusBar.setHidden(true);
    });
};

export default useHiddenStatusBar;