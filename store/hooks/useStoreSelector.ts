import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "../slices";

const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useStoreSelector;
