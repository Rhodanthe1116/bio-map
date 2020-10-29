import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// lazyload placeholder
import Image from 'material-ui-image'

const useStyles = makeStyles({
    card: {
        width: '345px',
        maxWidth: '100vw',
        // position: 'relative',
        // zIndex: '5000',
        // right: '170px',

    },
    media: {
        height: 140,
    },
});

function TreeInfoWindow({ tree, onDonateClick, onLearnMoreClick }) {

    const classes = useStyles();

    function handleDonateClick() {
        onDonateClick(tree)
    }

    function handleLearnMoreClick() {
        onLearnMoreClick(tree)
    }

    return (
        <Card className={classes.card}>
            <Carousel
                width="345px"
                height="140px"
                showStatus={false}
                showThumbs={false}
                centerMode
                swipeable
            >
                <Image
                    aspectRatio={(16 / 9)}
                    alt={tree.chineseTreeName}
                    disableSpinner
                    src={`https://source.unsplash.com/345x200/?tree?${tree.id + 0}`}
                />
                <Image
                    aspectRatio={(16 / 9)}
                    alt={tree.chineseTreeName}
                    disableSpinner
                    src={`https://source.unsplash.com/345x200/?tree?${tree.id + 1}`}
                />
                <Image
                    aspectRatio={(16 / 9)}
                    alt={tree.chineseTreeName}
                    disableSpinner
                    src={`https://source.unsplash.com/345x200/?tree?${tree.id + 2}`}
                />
            </Carousel>
            <CardContent>
                <Typography variant="outline">
                    {tree.growthFrom}
                </Typography>
                <Typography gutterBottom variant="h5">
                    {tree.chineseTreeName + " " + tree.englishTreeName.split(',')[0]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`${tree.chineseTreeName}是一種${tree.growthFrom}，樹必定會成為未來世界的新標準。 我們不得不面對一個非常尷尬的事實，那就是，領悟其中的道理也不是那麼的困難。`}
                </Typography>

            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleDonateClick}
                    // href="https://giving.ntu.edu.tw/DonationFormTW.aspx?lang=TW"
                    // target="_blank"
                >
                    保護我
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleLearnMoreClick}
                >
                    了解更多
                </Button>
            </CardActions>
        </Card>
    );
};

TreeInfoWindow.propTypes = {
    tree: PropTypes.shape({
        id: PropTypes.number,
        chineseTreeName: PropTypes.string,
        englishTreeName: PropTypes.string,
        scientificTreeName: PropTypes.string,
        growthFrom: PropTypes.string,
        season: PropTypes.string,
        isCommon: PropTypes.bool,
    }).isRequired,
};

TreeInfoWindow.defaultProps = {
    tree: {
        id: 0,
        chineseTreeName: '克利巴椰子',
        englishTreeName: 'Giriba Palm, Queen Palm',
        scientificTreeName: 'Syagrus romanzoffiana',
        growthFrom: '喬木',
        season: 'spring',
        isCommon: true,
    }
};
export default TreeInfoWindow