/*
@params

Input
data: Object =
{
    "driver_schedules": [
        {
            "id": 123,
            "driver_id": 10737,
            "start_time": "09:00",
            "end_time": "12:00",
            "start_at": "2018-02-01"
        },
        {
            "id": 124,
            "driver_id": 10737,
            "start_time": "13:00",
            "end_time": "18:00",
            "start_at": "2018-02-01"
        }
    ],
    "driver_assignments": [
        {
            "id": 1234,
            "driver_id": 10737,
            "route_id": 28,
            "job_id": null,
            "assignment_start": "2018-02-19 10:00:00",
            "assignment_end": "2018-02-19 11:00:00",
        },
        {
            "id": 1235,
            "driver_id": 10737,
            "route_id": 29,
            "job_id": null,
            "assignment_start": "2018-02-19 14:00:00",
            "assignment_end": "2018-02-19 16:00:00",
        }
    ],
    "routes": [
        {
            "id": 28,
            "customer_id": 14445,
            "driver_id": 10737,
            "route_settings": "{}",
            "pickup_date": "2018-02-19",
            "creator_user_id": 25143,
            "route_status_id": 1,
            "route_status_name": "Active",
            "order_id": null,
            "created_at": "2018-02-18 05:00:37",
            "updated_at": "2018-02-18 05:00:37",
            "route_locations": [
                {
                    "id": 91,
                    "route_id": 28,
                    "sequence": 1,
                    "grouping_location_id": 27313,
                    "location_type_id": 3,
                    "capacity": 20,
                    "route_location_status_id": 1,
                    "created_at": "2018-02-18 05:00:37",
                    "updated_at": "2018-02-18 05:00:37",
                    "address_details": {
                        "id": 256263,
                        "address": "310 Margaret Drive, Singapore 149303",
                        "unit_number": null,
                        "building_name": null,
                        "city": null,
                        "postal_code": null,
                        "country_code": "SG",
                        "lat": "1.2960990000000265",
                        "long": "103.80795750000004",
                        "address_type": {
                            "id": 3,
                            "address_type_name": "Pickup Location"
                        },
                        "created_at": "2018-02-07 03:58:11",
                        "updated_at": "2018-02-07 03:58:11"
                    },
                    "pickup_details": {
                        "pickup_date": "2018-02-19",
                        "pickup_window_start": "20:00:00",
                        "pickup_window_end": "21:00:00"
                    },
                    "delivery_details": []
                }
            ]
        }
    ]
}

Output
percentage: string
*/

export var calculateDriverUsage = function(data) {

    if (!data) {
        throw 'data is empty';
    }
    if (!data.driver_schedules || !data.driver_schedules.length) {
        throw 'driver_schedules is empty';
    }
    if (!data.driver_assignments || !data.driver_assignments.length) {
        throw 'driver_assignments is empty';
    }

    let driverSchedulesTime = null;
    for (let schedules of data.driver_schedules) {
        let startTime = new Date(schedules.start_at + " " + schedules.start_time).getTime();
        let endTime = new Date(schedules.start_at + " " + schedules.end_time).getTime();
        driverSchedulesTime += (endTime - startTime);
    }

    let driverAssignmentsTime = null;
    for (let assignments of data.driver_assignments) {
        let assignmentStart = new Date(assignments.assignment_start).getTime();
        let assignmentEnd = new Date(assignments.assignment_end).getTime();
        driverAssignmentsTime += (assignmentEnd - assignmentStart);
    }

    return (driverAssignmentsTime / driverSchedulesTime).toFixed(4);
}
