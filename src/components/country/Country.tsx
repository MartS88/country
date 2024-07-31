import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CountryInfo} from "../../types/icountry.ts";
import {handleImageError} from "../../utils/imageErrorUtils";


interface CountryProps {
    country: CountryInfo;
    setShowCountry: (value: CountryInfo) => void;
}

const Country: React.FC<CountryProps> = ({country, setShowCountry}) => {
    const clickHandler = (value: CountryInfo) => {
        setShowCountry(value)
    }

    if (!country || !country.flags || !country.name) {
        return <Typography variant="body1" color="error">Data is missing</Typography>;
    }

    return (
        <Card sx={{width: 345, margin: 'auto', cursor: 'pointer'}} key={country.name.common}
              onClick={() => clickHandler(country)}
        >
            <CardMedia
                component="img"
                height="140"
                image={country.flags.png}
                alt={`${country.name.common} Flag`}
                onError={handleImageError}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Capital: {country.capital}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Country;
