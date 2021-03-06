import {Axios} from "@/axios/axios";
import {orderFiles} from "../repo/functions";
import {Engine} from "../../engine";

export default {
    namespaced: true,
    state: {
        current: {},
        all: [],
        myRepos: [],
        files: [],
        reading: {},
        readingFiles: {},
        readings: [],
        readingFolder: {},
        readingFile: {},
        searchResults: [],
    },
    mutations: {
        setCurrent: (state, data) => state.current = data,
        setAll: (state, data) => state.all = data,
        setMyRepos: (state, data) => state.myRepos = data,
        setFiles: (state, data) => state.files = data,
        setSearchResults: (state, data) => state.searchResults = data,
        setReadingFile: (state, data) => state.readingFile = data,
        setReadings: (state, data) => state.readings = data,
        setReadingFiles: (state, data) => state.readingFiles = data,
        setReadingFolder: (state, data) => state.readingFolder = data,
        setReading: (state, data) => state.reading = data,
        makeCurrentReading: (state) => state.reading = Object.assign({}, state.current)
    },
    getters: {
        getCurrent: state => state.current,
        listAll: state => state.all,
        listMyRepos: state => state.myRepos,
        listFiles: state => state.files,
        listSearchResults: state => state.searchResults,
        readings: state => state.readings,
        listReadingFiles: state => state.readingFiles,
        getReadingFile: state => state.readingFile,
        getReadingFileHTML: state => {
            if (state.readingFile.content) {
                return Engine.fromBlockToHtml(Engine.fromTextToBlocks(state.readingFile.content))
            }
        },
        listReadingFolder: state => state.readingFolder,
        getReading: state => state.reading,
    },
    actions: {
        create: async (ctx, {name, title}) => {
            let m = await Axios.post("/api/v1/repos", {name, title})
            if (m.status === 200) {
                ctx.dispatch("notification/pushNotification", {
                    title: `Repo "${name}" created` ,
                    body: "Success",
                    type: "info"
                }, { root: true })
                return m.data.result
            }
            return null
        },
        getAll: async (ctx) => {
            let r = await Axios.get("/api/v1/repos")
            ctx.commit('setAll', r.data.result)
        },
        getMyRepos: async (ctx) => {
            let r = await Axios.get("/api/v1/repos/my")
            ctx.commit('setMyRepos', r.data.result)
        },
        beginWs: async (ctx, {id}) => {
            await Axios.wsOpen(`/api/v1/repos/w/${id}/`)
        },
        fetchCurrent: async (ctx, repo) => {
            let r = await Axios.get(`/api/v1/repos/u/${repo.username}/${repo.repo}`)
            ctx.commit('setCurrent', r.data.result)
        },
        files: async (ctx, list) => {
            ctx.commit("setFiles", list)
        },
        getReading: async (ctx) => {
            let r = await Axios.get("/api/v1/repos/reading/last")
            ctx.commit('setReading', r.data.result)
            return r.data.result
        },
        getReadingFiles: async (ctx, {username, repo}) => {
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.get(url)
            if (res.status === 200){
                ctx.commit('setReadingFiles', res.data.result)
                ctx.commit('setReadingFolder', orderFiles(res.data.result)[0])
            }
        },
        async setReading (ctx, {username, repo}) {
            const url = `api/v1/repos/reading/${username}/${repo}`
            let res = await Axios.post(url)
            if (res.status === 200) {
                ctx.commit('setReading', res.data.result)
            }
        },
        async fetchReadings (ctx) {
            const url = `api/v1/repos/reading`
            let res = await Axios.get(url)
            if (res.status === 200) {
                ctx.commit('setReadings', res.data.result)
            }
        },
        async updateRepo (ctx, repository) {
            const url = `api/v1/repos/u/${repository.user_name}/${repository.name}`
            let res = await Axios.patch(url, repository)
            if (res.status === 200) {
                ctx.commit('setCurrent', res.data.result)
            }
            return res.status === 200
        },
        async updateReading (ctx, {repository, file}) {
            ctx.commit('setReadingFile', file)
            const url = `api/v1/repos/reading/${repository.user_name}/${repository.name}`
            let res = await Axios.post(url, {}, file ? {params: {file: file.id}} : {})
            return res.status === 200
        },
        search: async (ctx, query) => {
            const url = `api/v1/repos`
            let res = await Axios.get(url, query ? {params: {q: query}}: {})
            if (res.status === 200) {
                ctx.commit('setSearchResults', res.data.result)
            }
        },
    }
}
