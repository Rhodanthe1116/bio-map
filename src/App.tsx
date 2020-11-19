import React, { useState, useEffect, Suspense } from 'react';

// utils
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom"
import { twd97ToLatLng } from './utils/utils'

// theme
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';

// style
import { makeStyles } from '@material-ui/core/styles';

// components 
import Box from '@material-ui/core/Box'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// my components
import TreeMap from './components/TreeMap';
import Loading from './components/Loading/Loading'
import FloatingNavgationBar from './components/FloatingNavgationBar'
import LabelBottomNavigation from './components/LabelBottomNavigation';
import TreeDetailDialog from './components/TreeDetailDialog';
import AchievementDialog from './components/AchievementDialog';
import dataProvider from './dataProvider.js'

// model
import { Tree } from './models/Tree'

const _ = require('lodash');

const useStyles = makeStyles((theme) => ({

    main: {
        flex: '1 1 auto'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    map: {
        height: '100%',
    },
    treeDetailDialog: {
        height: '80%',
        width: '80%',
    }
}));

const ntuLocation = {
    center: {
        lat: 25.017319,
        lng: 121.538977
    },
    zoom: 16,
}


interface Filter {
    type: string;
    value: string;
}
function App() {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                {/* <MyAppBar profile={profile} /> */}
                {/* <DenseAppBar /> */}
                <main className={classes.main}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/" component={Main} />
                            <Route path="/map" component={Main} />

                        </Switch>
                    </Suspense>
                </main>
                <LabelBottomNavigation />
            </Router>

            {/* <TreeAppBar /> */}



        </ThemeProvider>

    )
}

function Main() {
    const classes = useStyles()
    let history = useHistory();
    const [selectedTree, setSelectedTree] = useState<Tree | null>(null)

    const [trees, setTrees] = useState<Tree[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [filter, setFilter] = useState({ type: "all", value: "on" })
    useEffect(() => {
        setTrees([])
        setLoading(true)

        dataProvider.getTrees()
            .then((newTrees: Tree[]) => {
                if (filter.type !== 'all' && filter.type !== 'area') {
                    newTrees = newTrees.filter((tree: Tree) => {
                        return true
                        return false
                    })
                }

                newTrees = _.shuffle(newTrees)
                newTrees = newTrees.slice(0, 50)

                newTrees.forEach((tree: Tree) => {
                    tree.latitude = ntuLocation.center.lat + (Math.random() - 0.5) * 0.003 - 0.0015
                    tree.longitude = ntuLocation.center.lng + (Math.random() - 0.5) * 0.003 - 0.0045
                    // const { lat, lng } = twd97ToLatLng(2767643.21, 303861.3074)
                    // tree.latitude = lat
                    // tree.longitude = lng
                });
                setTrees(newTrees)
            })
            .catch(error => {
                console.error(error)
                setError(`Error getting trees QQ ${error}`)
            })

        setLoading(false)
    }, [filter])

    function openTreeDetail(tree: Tree) {
        history.push(`/trees/${tree.code}`)
        setSelectedTree(tree)
    }
    function closeTreeDetail(tree: Tree) {
        history.push(`/`)
        setSelectedTree(null)
    }
    return (
        <Box className={classes.map}>
            <FloatingNavgationBar
                filter={filter}
                onFilterChange={(newFilter: Filter) => setFilter(newFilter)} />
            <TreeMap
                onTreeClick={openTreeDetail}
                trees={trees}
            />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/trees/:treeId">
                        <TreeDetailDialog
                            open={selectedTree !== null}
                            tree={selectedTree}
                            onClose={closeTreeDetail}
                        />
                    </Route>
                    <Route path="/achievement">
                        <AchievementDialog
                            open={true}
                            onClose={() => history.push("/")}
                        />
                    </Route>

                </Switch>
            </Suspense>


            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Snackbar open={error ? true : false} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>

    )
}
export default App;
