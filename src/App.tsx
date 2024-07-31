import React, { useEffect, useRef, useState } from 'react';
import classes from './App.module.scss';
import axios from 'axios';
import Country from "./components/country/Country";
import { CountryInfo } from "./types/icountry";
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { scrollToElement } from "./utils/scrollUtils.ts";
import { Box, Button } from "@mui/material";
import ActiveCountry from "./components/activeCountry/ActiveCountry.tsx";

function App() {
    const [data, setData] = useState<CountryInfo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [showCountry, setShowCountry] = useState<CountryInfo | null>(null);
    const activeCountryRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErrorMsg('');
            setError(false);
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setData(response.data);
                setLoading(false);
            } catch (err: any) {
                console.log(err);
                setError(true);
                setErrorMsg(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeCountryRef.current && !activeCountryRef.current.contains(event.target as Node)) {
                setShowCountry(null);
            }
        };

        if (showCountry) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCountry]);

    return (
        <div className={classes.app} id='scroll_up'>
            {!loading && error && <div className={classes.error}>{errorMsg}</div>}
            {loading && <div className={classes.loader}>Loading...</div>}
            {!loading && !error && data && data.length > 0 && (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={scrollToElement('scroll_down')}
                            startIcon={<FaLongArrowAltDown size={15} />}
                        >
                            Scroll Down
                        </Button>
                    </Box>

                    <div className={classes.country_block}>
                        {data.map((country: CountryInfo, index: number) => (
                            <Country key={index} country={country} setShowCountry={setShowCountry} />
                        ))}
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={scrollToElement('scroll_up')}
                            endIcon={<FaLongArrowAltUp size={15} />}
                            id='scroll_down'
                        >
                            Scroll Up
                        </Button>
                    </Box>
                </>
            )}
            {showCountry && (
                <div className={classes.active_country}>
                    <ActiveCountry showCountry={showCountry} setShowCountry={setShowCountry}  ref={activeCountryRef}/>
                </div>
            )}
        </div>
    );
}

export default App;
