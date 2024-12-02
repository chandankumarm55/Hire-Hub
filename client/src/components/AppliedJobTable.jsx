import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table';

const AppliedJobTable = () => {
    // Safely get appliedJobs from state with a fallback to an empty array
    const { allAppliedJobs } = useSelector(state => state.job);


    const getStatusColor = (status) => {
        if (!status) return 'text-gray-500'; // Fallback color when status is undefined or null
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'text-orange-500';
            case 'accepted':
                return 'text-green-500';
            case 'rejected':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5 } }
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-gray-300 rounded-lg">
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-gray-700">
                            <TableCell className="border-b border-gray-300 px-4 py-3">Job Title</TableCell>
                            <TableCell className="border-b border-gray-300 px-4 py-3">Company</TableCell>
                            <TableCell className="border-b border-gray-300 px-4 py-3">Applied Date</TableCell>
                            <TableCell className="border-b border-gray-300 px-4 py-3">Status</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { allAppliedJobs?.length > 0 ? (
                            allAppliedJobs?.map((appliedJob, index) => (
                                <motion.tr
                                    key={ appliedJob._id }
                                    className="hover:bg-gray-100 transition-colors duration-300"
                                    initial={ { opacity: 0, y: 10 } }
                                    animate={ { opacity: 1, y: 0 } }
                                    transition={ { duration: 0.3, delay: index * 0.1 } }
                                >
                                    <TableCell className="border-b border-gray-300 px-4 py-3">
                                        { appliedJob?.job.title }
                                    </TableCell>
                                    <TableCell className="border-b border-gray-300 px-4 py-3">
                                        { appliedJob?.job.company.name }
                                    </TableCell>
                                    <TableCell className="border-b border-gray-300 px-4 py-3">
                                        { new Date(appliedJob.createdAt).toLocaleDateString() }
                                    </TableCell>
                                    <TableCell
                                        className={ `border-b border-gray-300 px-4 py-3 ${getStatusColor(
                                            appliedJob?.status
                                        )}` }
                                    >
                                        { appliedJob?.status || 'Unknown' }
                                    </TableCell>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No applied jobs found
                                </td>
                            </tr>
                        ) }
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default AppliedJobTable;