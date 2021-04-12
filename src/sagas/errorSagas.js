import { CRUD_CREATE_FAILURE, CRUD_UPDATE_FAILURE } from "react-admin";
import { put, takeEvery } from "redux-saga/effects";

import { setFormErrors } from "./customActions";

export default function* formErrorSagas() {
    yield takeEvery(CRUD_CREATE_FAILURE, handleCrudFailure);
    yield takeEvery(CRUD_UPDATE_FAILURE, handleCrudFailure);
}

function* handleCrudFailure(action) {
    const { payload } = action;
    const { resource } = action.meta;

    yield put(setFormErrors({ [resource]: payload }));
}