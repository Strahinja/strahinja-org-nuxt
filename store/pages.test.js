import _ from 'lodash';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

describe('store/pages', () =>
{
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let NuxtStore;
    let store;

    beforeAll(async () =>
    {
        const storePath = `${process.env.buildDir}/store.js`;
        NuxtStore = await import(storePath);
    });

    beforeEach(async () =>
    {
        store = await NuxtStore.createStore();
    });

    describe('pages', () =>
    {

        beforeEach(async () =>
        {
            await store.dispatch('pages/setCurrentPageFromRouteName', 'index');
        });

        describe('pageId', () =>
        {
            let pageId;

            beforeEach(async () =>
            {
                pageId = store.getters['pages/pageId'];
            });

            test('pageId is a string', () =>
            {
                expect(_.isString(pageId)).toBe(true);
            });
        });

        describe('pageById', () =>
        {
            let pageById;

            beforeEach(async () =>
            {
                pageById = store.getters['pages/pageById'];
            });

            test('pageById is a function', () =>
            {
                expect(_.isFunction(pageById)).toBe(true);
            });

            test('pageById() is falsy', () =>
            {
                expect(pageById()).toBeFalsy();
            });

            test('pageById(home) returns an object', () =>
            {
                expect(_.isObject(pageById('home'))).toBe(true);
            });

            test('pageById(home) is not empty', () =>
            {
                expect(_.isEmpty(pageById('home'))).toBe(false);
            });
        });

        describe('pageByRouteName', () =>
        {
            let pageByRouteName;

            beforeEach(async () =>
            {
                pageByRouteName = store.getters['pages/pageByRouteName'];
            });

            test('pageByRouteName is a function', () =>
            {
                expect(_.isFunction(pageByRouteName)).toBe(true);
            });

            test('pageByRouteName() is falsy', () =>
            {
                expect(pageByRouteName()).toBeFalsy();
            });

            test('pageByRouteName(index) returns an object', () =>
            {
                expect(_.isObject(pageByRouteName('index'))).toBe(true);
            });

            test('pageByRouteName(index) is not empty', () =>
            {
                expect(_.isEmpty(pageByRouteName('index'))).toBe(false);
            });
        });

        describe('subpages', () =>
        {
            let subpages;

            beforeEach(async () =>
            {
                subpages = store.getters['pages/subpages'];
            });

            test('subpages is a function', () =>
            {
                expect(_.isFunction(subpages)).toBe(true);
            });

            test('subpages() is empty', () =>
            {
                expect(_.isEmpty(subpages())).toBe(true);
            });

            test('subpages(/tekstovi) is an array', () =>
            {
                expect(_.isArray(subpages('/tekstovi'))).toBe(true);
            });

            test('subpages(/tekstovi) is nonempty', () =>
            {
                expect(_.isEmpty(subpages('/tekstovi'))).toBe(false);
            });

            test('subpages(/tekstovi) has more than one member', () =>
            {
                expect(subpages('/tekstovi').length).toBeGreaterThan(1);
            });
        });

        describe('navigationPages', () =>
        {
            let navigationPages;

            beforeEach(async () =>
            {
                navigationPages = store.getters['pages/navigationPages'];
            });

            test('navigationPages is an array', () =>
            {
                expect(_.isArray(navigationPages)).toBe(true);
            });

            test('navigationPages has more than one member', () =>
            {
                expect(navigationPages.length).toBeGreaterThan(1);
            });
        });

        describe('isPageAdminById', () =>
        {
            let isPageAdminById;

            beforeEach(async () =>
            {
                isPageAdminById = store.getters['pages/isPageAdminById'];
            });

            test('isPageAdminById is a function', () =>
            {
                expect(_.isFunction(isPageAdminById)).toBe(true);
            });

            test('isPageAdminById() to throw an error', () =>
            {
                expect(() =>
                {
                    isPageAdminById();
                }).toThrow();
            });

            test('isPageAdminById(users) is true', () =>
            {
                expect(isPageAdminById('users')).toBe(true);
            });

            test('isPageAdminById(users-me-index) is false', () =>
            {
                expect(isPageAdminById('users-me-index')).toBe(false);
            });
        });

        describe('isPageProtectedById', () =>
        {
            let isPageProtectedById;

            beforeEach(async () =>
            {
                isPageProtectedById = store.getters['pages/isPageProtectedById'];
            });

            test('isPageProtectedById is a function', () =>
            {
                expect(_.isFunction(isPageProtectedById)).toBe(true);
            });

            test('isPageProtectedById() to throw an error', () =>
            {
                expect(() =>
                {
                    isPageProtectedById();
                }).toThrow();
            });

            test('isPageProtectedById(users) is true', () =>
            {
                expect(isPageProtectedById('users')).toBe(true);
            });

            test('isPageProtectedById(users-me-index) is true', () =>
            {
                expect(isPageProtectedById('users-me-index')).toBe(true);
            });
        });

        describe('sourceURL', () =>
        {
            let sourceURL;

            beforeEach(async () =>
            {
                sourceURL = store.getters['pages/sourceURL'];
            });

            test('sourceURL is a string', () =>
            {
                expect(_.isString(sourceURL)).toBe(true);
            });
        });

        describe('mainToolbarPages', () =>
        {
            let mainToolbarPages;

            beforeEach(async () =>
            {
                mainToolbarPages = store.getters['pages/mainToolbarPages'];
            });

            test('mainToolbarPages is an array', () =>
            {
                expect(_.isArray(mainToolbarPages)).toBe(true);
            });
        });
    });
});

