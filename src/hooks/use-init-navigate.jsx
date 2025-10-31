import { ANIMATION_MODE, flyOptions } from "@/configs/const.config";
import { animationActions } from "@/redux/slices/animation.slice";
import { getLS } from "@/tools/local-storage.tool";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";

function useInitNavigate() {
    const map = useMap();
    const dispatch = useDispatch();

    useEffect(() => {
        (() => {
            const params = new URLSearchParams(window.location.search);
            const x = parseFloat(params.get('x'));
            const y = parseFloat(params.get('y'));
            const z = parseFloat(params.get('z'));
            const f = parseFloat(params.get('f'));


            if (!isNaN(x) && !isNaN(y) && !isNaN(z) && !isNaN(f)) {
                dispatch(animationActions.setStates({ field: "frame", value: f }));
                dispatch(animationActions.setStates({ field: "mode", value: ANIMATION_MODE.STATIC }));
                map.flyTo([y, x], z, flyOptions);
                return;
            }

            const recentLocation = getLS("map", { x: 0, y: 0, z: 0, f: 0 });
            dispatch(animationActions.setStates({ field: "frame", value: recentLocation.f }));
            map.flyTo([recentLocation.y, recentLocation.x], recentLocation.z, flyOptions);
        })()
    }, [map, dispatch]);

    return null;
}

export default useInitNavigate;