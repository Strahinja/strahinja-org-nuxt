import _ from 'lodash';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

describe('store/pages', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let NuxtStore
    let store

    beforeAll(async () => {
        const storePath = `${process.env.buildDir}/store.js`;
        NuxtStore = await import(storePath);
    })

    beforeEach(async () => {
        store = await NuxtStore.createStore()
    })

    describe('pages', () => {
        let pageId
        let pageById
        let pageByRouteName
        let subpages
        let navigationPages
        let isPageAdminById
        let isPageProtectedById
        let sourceURL
        let mainToolbarPages
        let showCookieConsent
        let svgComponentName

        beforeEach(async () => {
            await store.dispatch('pages/setCurrentPageFromRouteName', 'index');
            pageId = store.getters['pages/pageId']
            pageById = store.getters['pages/pageById']
            pageByRouteName = store.getters['pages/pageByRouteName']
            subpages = store.getters['pages/subpages']
            navigationPages = store.getters['pages/navigationPages']
            isPageAdminById = store.getters['pages/isPageAdminById']
            isPageProtectedById = store.getters['pages/isPageProtectedById']
            sourceURL = store.getters['pages/sourceURL']
            mainToolbarPages = store.getters['pages/mainToolbarPages']
            showCookieConsent = store.getters['pages/showCookieConsent']
            svgComponentName = store.getters['pages/svgComponentName']
        })

        test('pageId is a string', () => {
            expect(_.isString(pageId)).toBe(true)
        })

        test('pageById is a function', () => {
            expect(_.isFunction(pageById)).toBe(true)
        })

        test('pageById(home) returns an object', () => {
            expect(_.isObject(pageById('home'))).toBe(true)
        })

        test('pageById(home) is not empty', () => {
            expect(_.isEmpty(pageById('home'))).toBe(false)
        })

        test('pageByRouteName is a function', () => {
            expect(_.isFunction(pageByRouteName)).toBe(true)
        })

        test('subpages is a function', () => {
            expect(_.isFunction(subpages)).toBe(true)
        })

        test('navigationPages is an array', () => {
            expect(_.isArray(navigationPages)).toBe(true)
        })

        test('isPageAdminById is a function', () => {
            expect(_.isFunction(isPageAdminById)).toBe(true)
        })

        test('isPageProtectedById is a function', () => {
            expect(_.isFunction(isPageProtectedById)).toBe(true)
        })

        test('sourceURL is a string', () => {
            expect(_.isString(sourceURL)).toBe(true)
        })

        test('mainToolbarPages is an array', () => {
            expect(_.isArray(mainToolbarPages)).toBe(true)
        })

        test('showCookieConsent is a boolean', () => {
            expect(_.isBoolean(showCookieConsent)).toBe(true)
        })

        test('svgComponentName is a function', () => {
            expect(_.isFunction(svgComponentName)).toBe(true)
        })
    })
})

