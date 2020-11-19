import React, { useState, useEffect, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom"

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

    const [trees, setTrees] = useState([])
    const [filter, setFilter] = useState({ type: "all", value: "on" })
    const [error, setError] = useState(false)
    useEffect(() => {
        setTrees([])
        const root = process.env.REACT_APP_DATA_PROVIDER_URL;
        const action = '/trees'
        fetch(`${root}${action}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('get trees failed')
                }
            })
            .then((jsonResponse) => {
                let newTrees = jsonResponse

                if (filter.type !== 'all' && filter.type !== 'area') {
                    newTrees = newTrees.filter((tree: Tree) => {
                        return true
                        return false
                    })
                }

                newTrees = _.shuffle(newTrees)
                newTrees = newTrees.slice(0, 50)

                newTrees.forEach((tree: Tree) => {
                    tree.latitude = ntuLocation.center.lat + (Math.random() - 0.5) * 0.01
                    tree.longitude = ntuLocation.center.lng + (Math.random() - 0.5) * 0.01
                });
                setTrees(newTrees)
            })
            .catch(error => {
                setError(error.toString())
            })
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


            <Backdrop className={classes.backdrop} open={trees.length === 0}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
                <Alert onClose={() => setError(false)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>

    )
}
export default App;
