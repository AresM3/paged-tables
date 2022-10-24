# PagedTables

This library provides items to deal with the server-side pagination of data.

## Datasource

This library implements the Angular Material Datasource logic to some typical situations.

- **PagedIndexMaterialTableDatasource**: this datasource manages an observable that returns a response defined in the
  PagedIndexModel interface, all according to Angular Material Datasource design.
- **IndexableMaterialTableDatasource**: this datasource needs a service that has got an index method that returns a
  PagedIndexModel type response and then process it according to Angular Material Datasource design.
- **MaterialTableDatasource**: a simple datasource that manages an observable of a simple array

## Helpers

This library also provides some useful helpers.

- **PagedIndexQuery**: class that helps on the construction of query url
- **MaterialTableViewer**: class that stands as a base for a MaterialTableComponent implementation. It has got an IndexableMaterialTableDatasource.
- **TableSettingsStorage**: a storage that saves the settings about the component's that uses PagedTables
