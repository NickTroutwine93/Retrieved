import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function createDataTable(unitData,columns) {
    //console.log(columns)
    
    return(
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
            rows={unitData}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 20, 50]}
            checkboxSelection
            />
        </div>
    );

}