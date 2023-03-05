import { createContext, useContext, useState, FC, ReactNode } from "react";



const QrContext = createContext(null);

export const QrProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [qR, setQr] = useState('')


    const values: any = {
        qR,
        setQr,
          

    }


    return (
        <QrContext.Provider value={values}>{children}</QrContext.Provider>
    );
}



export const useQr = () => useContext(QrContext);

