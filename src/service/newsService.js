import axios from "axios";

export const newsService = ({dispatch}) => {

    dispatch.setter('newsReducer', {isProgress: true})

    return {
        list: () => {
            return axios.get(`/news/list`)
                .then(
                    (r) => {
                        return r.data;
                    }
                )
                .then(
                    (r) => {
                        dispatch.setter('newsReducer', {isProgress: false});
                        return r;
                    }
                )
        },
        id: (id) => {
            return axios.get(`/news/get?id=${id}`)
                .then(
                    (r) => {
                        return r.data;
                    }
                )
                .then(
                    (r) => {
                        dispatch.setter('newsReducer', {isProgress: false});
                        return r;
                    }
                )
        }
    }

}