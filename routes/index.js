import _ from 'lodash'
import Handlers from './handlers'

export default async function (app) {
    _.each(Handlers, handler => {
        app[handler.method](handler.route, handler.handler);
    })
}