<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<form method='POST' action='?/register' class='text-yellow-200 flex flex-col justify-center items-center h-screen text-xl gap-6'>
    <div class='flex flex-col gap-6 my-5'>
        <div>
            <a href='/' class='underline hover:text-yellow-100'>&larr; Back</a>
        </div>
        <div class='flex gap-10'>
            <div class='flex flex-col'>
                <label for='first-name'>First Name</label>
                <input id='first-name' placeholder='John' name='first-name' type='text' value={form?.f_name ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'/>
                {#if form?.f_name_missing}<p class='text-error'>First name is required</p>{/if}
            </div>
            <div class='flex flex-col'>
                <label for='last-name'>Last Name</label>
                <input id='last-name' placeholder='Doe' name='last-name' type='text' value={form?.l_name ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'/>
                {#if form?.l_name_missing}<p class='text-error'>Last name is required</p>{/if}
            </div>
        </div>
        <div class='flex flex-col'>
            <label for='team-name'>Team Name</label>
            <input id='team-name' placeholder="John Doe's Team" name='team-name' type='text' value={form?.t_name ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'/>
            {#if form?.t_name_missing}<p class='text-error'>Team name is required</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='email'>Email</label>
            <input id='email' placeholder='jdoe@example.com' name='email' type='text' value={form?.email ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.email_missing}<p class='text-error'>Email is required</p>{/if}
            {#if form?.email_invalid}<p class='text-error'>Enter a valid email</p>{/if}
            {#if form?.email_exists}<p class='text-error'>Email is already in use</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='password'>Password</label>
            <input id='password' placeholder='Password' name='password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.password_missing}<p class='text-error'>Password is required</p>{/if}
            {#if form?.password_invalid}<p class='text-error'>Password must be at least 8 characters long</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='confirm-password'>Confirm Password</label>
            <input id='confirm-password' placeholder='Confirm Password' name='confirm-password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.password_mismatch}<p class='text-error'>Passwords do not match</p>{/if}
        </div>
        <button class='bg-yellow-200 text-blue-100 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-blue-200 hover:text-yellow-200'>Register</button>
    </div>
</form>