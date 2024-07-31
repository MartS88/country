import  { forwardRef } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { CountryInfo } from "../../types/icountry.ts";
import { IoMdClose } from "react-icons/io";

interface ActiveCountryProps {
    showCountry: CountryInfo | null;
    setShowCountry: (value: CountryInfo | null) => void;
}

const ActiveCountry = forwardRef<HTMLDivElement, ActiveCountryProps>(({ showCountry, setShowCountry }, ref) => {
    if (!showCountry) return null;

    const closeHandler = () => {
        setShowCountry(null);
    };

    return (
        <Card ref={ref} sx={{ width: 360, margin: '20px auto', position: 'relative' }}>
            <IconButton
                sx={{ position: 'absolute', top: 5, right: 5 }}
                onClick={closeHandler}
            >
                <IoMdClose size='18' color={'black'} />
            </IconButton>
            <CardMedia
                component="img"
                height="200"
                image={showCountry.flags.png}
                alt={`${showCountry.name.common} Flag`}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {showCountry.name.common} ({showCountry.cca3})
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Capital:</strong> {showCountry.capital.join(', ')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Region:</strong> {showCountry.region}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Population:</strong> {showCountry.population.toLocaleString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Timezones:</strong> {showCountry.timezones.join(', ')}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href={showCountry.maps.googleMaps}
                    target="_blank"
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                        transition: '0.3s',
                    }}
                >
                    View on Google Maps
                </Button>
            </CardContent>
        </Card>
    );
});

export default ActiveCountry;
