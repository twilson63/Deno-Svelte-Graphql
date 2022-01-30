import { serve } from 'server'
import { cond, compose, invoker, prop, tap } from 'ramda'
import { graphql } from './api.ts'

serve((req) => 
  cond([
    [route('/graphql'), graphql],
    [route('/'), () => new Response('Hello World')]
  ])(req)
)


function route(pathname : string) {
  const ROUTE = new URLPattern({pathname})
  const x = _ => invoker(1, 'test')(_)(ROUTE)

  return compose(tap(console.log), x, prop('url'))
}