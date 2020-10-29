import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// icons
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TodayIcon from '@material-ui/icons/Today';
import HeightIcon from '@material-ui/icons/Height';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import StyleIcon from '@material-ui/icons/Style';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EcoIcon from '@material-ui/icons/EcoOutlined';

// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// lazyload placeholder
import Image from 'material-ui-image'

// my components

const useStyles = makeStyles((theme) => ({

    detail: {
        marginTop: theme.spacing(2),
        // width: 400,
        // maxWidth: '90vw',

    },
    divider: {
        marginBottom: theme.spacing(2),
    },
    icon: {
        color: theme.palette.primary.main
    },
    treeDetail: {
        // height: 60,
        // marginBottom: 16,
        textOverflow: 'normal',
    }

}));

function SimpleListItem({ button = false, icon, color = "primary", primary }) {
    const classes = useStyles()
    return (
        <ListItem button={button}>
            <ListItemIcon className={classes.icon}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    )
}


export default function TreeDetail({ tree }) {
    const classes = useStyles();

    const treeDetailFallback = `${tree.chineseTreeName}是一種${tree.growthFrom}，樹必定會成為未來世界的新標準。 我們不得不面對一個非常尷尬的事實，那就是，領悟其中的道理也不是那麼的困難。`

    const [treeDetail, setTreeDetail] = useState("")

    useEffect(() => {
        const proxyurl = "https://damp-cliffs-64400.herokuapp.com/";
        fetch(proxyurl + `https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${tree.scientificTreeName}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('error getting tree detail')
            })
            .then(jsonResponse => {
                let newTreeDetail = jsonResponse.query.pages[Object.keys(jsonResponse.query.pages)[0]].extract
                const treeDetailLimit = 200
                newTreeDetail = newTreeDetail.substring(0, treeDetailLimit)
                setTreeDetail(newTreeDetail)
            })
            .catch(e => {
                setTreeDetail(treeDetailFallback)
                console.log(e)
            })
    })

    return (
        <div>
            <Carousel
                height="225px"
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

            <Container
                className={classes.detail}
                role="presentation"
            >
                <Typography gutterBottom variant="h5">
                    {tree.chineseTreeName + " " + tree.englishTreeName.split(',')[0]}
                </Typography>

                <div className={classes.treeDetail}>
                    <Typography className="dotdotdot" variant="body2" color="textSecondary" paragraph>
                        {treeDetail}
                    </Typography>
                </div>

                <Divider className={classes.divider} />

                <Typography variant="subtitle2">
                    樹木資訊
                </Typography>
                <List dense aria-label="tree-detail">
                    <SimpleListItem
                        button={true}
                        icon={<LocalOfferIcon className={classes.icon} />}
                        primary={treePlaceholder.co}
                    />
                    <SimpleListItem
                        icon={<TodayIcon className={classes.icon} />}
                        primary={`調查時間：${treePlaceholder.createTime}`}
                    />
                    <SimpleListItem
                        icon={<HeightIcon className={classes.icon} />}
                        primary={`樹高：${treePlaceholder.treeHeight}`}
                    />
                    <SimpleListItem
                        icon={<ZoomOutMapIcon className={classes.icon} />}
                        primary={`樹冠幅：${treePlaceholder.treeCrownHeight}`}
                    />
                    <SimpleListItem
                        icon={<PowerInputIcon className={classes.icon} />}
                        primary={`胸徑：${treePlaceholder.treePath}`}
                    />
                    <SimpleListItem
                        icon={<RotateLeftIcon className={classes.icon} />}
                        primary={`周長：${treePlaceholder.treePerimeter}`}
                    />
                </List>

                <Divider className={classes.divider} />

                <Typography variant="subtitle2">
                    樹種小百科
                </Typography>
                <List aria-label="tree-catagory-info">
                    <ListItem button>
                        <ListItemIcon>
                            <StyleIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={tree.growthFrom}
                        />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <TranslateIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="英文名"
                            secondary={tree.englishTreeName}
                        />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <MenuBookIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="學名"
                            secondary={tree.scientificTreeName}
                        />
                    </ListItem>
                    <SimpleListItem
                        button={true}
                        icon={<EcoIcon className={classes.icon} />}
                        primary={determineSeason(tree)}
                    />
                </List>
            </Container>
        </div>
    );
}

function determineSeason(tree) {
    if (tree.seasonSpring === "on") {
        return '春季'
    } else if (tree.seasonSummer === "on") {
        return '夏季'
    } else if (tree.seasonSummer === "on") {
        return '秋季'
    } else if (tree.seasonSummer === "on") {
        return '冬季'
    } else {
        return '非季節性'
    }
}




const treePlaceholder = {
    id: 0,
    chineseTreeName: '克利巴椰子',
    englishTreeName: 'Giriba Palm, Queen Palm',
    scientificTreeName: 'Syagrus romanzoffiana',
    growthFrom: '喬木',
    season: 'spring',
    isCommon: true,
    co: "N 1-10_0205",
    createTime: "2012-05-06T02:23:11.000Z",
    treeHeight: "11.24",
    treeCrownHeight: "11.4728",
    treePath: "29.921",
    treePerimeter: "94",
}
