import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MediaCard(props) {
    return (
        <>
            <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={props.img1}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Carte VISA AVENIRIA <div> 0 $</div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Parfait pour la publicité Google Ads, TikTok Ads et Bing Ads.

                        <div className='detailCard'>
                            <div><FaCheckCircle /> <span>Carte de Crédit</span></div>
                            <div><FaCheckCircle /> <span>Rechargeable</span></div>
                            <div><FaCheckCircle /> <span>Remboursements</span></div>
                            <div><FaCheckCircle /> <span>Publicité en Ligne</span></div>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Link to="create">
                            Créer cette carte
                        </Link>
                    </Button>
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={props.img2}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        CARTE MASTERCARD AVENIRIA
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        arfait pour la publicité en Agence ou Equipe Marketing (Corporate & Entreprise).

                        <div className='detailCard'>
                            <div><FaCheckCircle /> <span>Carte de Crédit</span></div>
                            <div><FaCheckCircle /> <span>Rechargeable</span></div>
                            <div><FaCheckCircle /> <span>Paiement Universel</span></div>
                            <div><FaCheckCircle /> <span>Remboursements</span></div>
                            <div><FaCheckCircle /> <span>Rechargeable</span></div>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Link to="create">
                            Créer cette carte
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}