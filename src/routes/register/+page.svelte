<form class='text-orange flex flex-col justify-center items-center h-screen text-2xl'>
    <div class='flex flex-col gap-6'>
        <div class='flex gap-10'>
            <div class='flex flex-col'>
                <label for='first-name' class=''>First Name</label>
                <input id='first-name' placeholder='John' class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'/>
            </div>
            <div class='flex flex-col'>
                <label for='last-name'>Last Name</label>
                <input id='last-name' placeholder='Doe' class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'/>
            </div>
        </div>
        <div class='flex flex-col'>
            <label for='team-name'>Team Name</label>
            <input id='team-name' placeholder="John Doe's Team" class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'/>
        </div>
        <div class='flex flex-col'>
            <label for='email'>Email</label>
            <input id='email' type='email' placeholder='jdoe@example.com' class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'>
        </div>
        <div class='flex flex-col'>
            <label for='password'>Password</label>
            <input id='password' type='password' placeholder='Password' class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'>
        </div>
        <div class='flex flex-col'>
            <label for='confirm-password'>Confirm Password</label>
            <input id='confirm-password' type='password' placeholder='Confirm Password' class='bg-blue-100 border-blue-200 rounded-lg border-4 text-blue-400 p-3'>
        </div>
        <button class='bg-orange text-blue-100 mx-auto p-3 px-16 rounded-lg mt-6'>Register</button>
    </div>
</form>