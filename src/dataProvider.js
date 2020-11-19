const root = 'https://bio-map-server.herokuapp.com' || process.env.REACT_APP_DATA_PROVIDER_URL;

const dataProvider = {

    async getTrees() {
        const path = 'trees'
        try {
            const response = await fetch(`${root}/${path}`)
            if (!response.ok) {
                throw new Error(`Getting trees failed: ${response.status} ${response.statusText}`)
            }
            const newTrees = response.json()
            return newTrees
        } catch (error) {
            console.error(`Error getting trees: ${error.toString()}`)
            throw error

        }
    },

    async getAchievements() {
        const path = 'achievements'

        try {
            const response = await fetch(`${root}/${path}`)
            if (!response.ok) {
                throw new Error(`Getting ${path} failed: ${response.status} ${response.statusText}`)
            }
            return response.json()
        } catch (error) {
            console.error(`Error getting ${path}: ${error.toString()}`)
            throw error

        }
    }
}

export default dataProvider 