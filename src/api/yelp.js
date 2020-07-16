import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer dWWnMDW0ODvTRcqNWahS3RSidxyrqucRSZvAFkNA7ITQuz8nOKBtHiJnYqouNkef92I5Rwf0s68zgQVOplb6Qxr9fLBs4yuZQ_NN_npQmC4SOIxUPfeInYU2Oc3hXnYx'
  }
});
